import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const results: string[] = [];
    let synced = 0;
    let removed = 0;
    let created = 0;

    // ── Step 1: Clean up local orders against Stripe ──
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("id, stripe_session_id, status, customer_name, customer_email, shipping_address")
      .order("created_at", { ascending: false })
      .limit(200);

    if (ordersError) throw ordersError;

    const knownSessionIds = new Set<string>();

    for (const order of orders || []) {
      if (!order.stripe_session_id) continue;
      knownSessionIds.add(order.stripe_session_id);

      try {
        const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id, {
          expand: ["payment_intent", "line_items"],
        });

        if (session.payment_status !== "paid") {
          await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);
          await supabaseAdmin.from("orders").delete().eq("id", order.id);
          removed++;
          results.push(`Removed unpaid order ${order.id}`);
          continue;
        }

        // Sync real data from Stripe
        const customerName =
          session.shipping_details?.name ||
          session.customer_details?.name ||
          (session as any).metadata?.customer_name ||
          order.customer_name;

        const customerEmail =
          session.customer_details?.email ||
          (session as any).customer_email ||
          order.customer_email;

        const shippingAddr = session.shipping_details?.address || ({} as any);

        const updateData: Record<string, any> = {
          status: "paid",
          customer_name: customerName,
          customer_email: customerEmail,
        };

        if (shippingAddr.line1) updateData.shipping_address = shippingAddr.line1;
        if (shippingAddr.city) updateData.shipping_city = shippingAddr.city;
        if (shippingAddr.state) updateData.shipping_state = shippingAddr.state;
        if (shippingAddr.postal_code) updateData.shipping_zip = shippingAddr.postal_code;

        const pi = (session as any).payment_intent;
        if (pi && typeof pi === "object" && pi.amount_received) {
          updateData.total = pi.amount_received / 100;
        }

        await supabaseAdmin.from("orders").update(updateData).eq("id", order.id);
        synced++;
      } catch (stripeErr: any) {
        if (stripeErr.statusCode === 404) {
          await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);
          await supabaseAdmin.from("orders").delete().eq("id", order.id);
          removed++;
          results.push(`Removed stale order ${order.id}`);
        } else {
          results.push(`Stripe error for ${order.id}: ${stripeErr.message}`);
        }
      }
    }

    // ── Step 2: Pull ALL succeeded checkout sessions from Stripe and create missing ones ──
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const params: any = { limit: 100, status: "complete" };
      if (startingAfter) params.starting_after = startingAfter;

      const sessions = await stripe.checkout.sessions.list(params);

      for (const session of sessions.data) {
        if (session.payment_status !== "paid") continue;
        if (knownSessionIds.has(session.id)) continue;

        // This is a paid session missing from our DB -- create it
        const customerName =
          session.shipping_details?.name ||
          session.customer_details?.name ||
          (session as any).metadata?.customer_name ||
          "Unknown";

        const customerEmail =
          session.customer_details?.email ||
          (session as any).customer_email ||
          "";

        const shippingAddr = session.shipping_details?.address || ({} as any);

        const total = (session.amount_total || 0) / 100;
        const subtotal = (session.amount_subtotal || 0) / 100;
        const shippingCost = total - subtotal;

        // Insert order
        const { data: newOrder, error: insertErr } = await supabaseAdmin
          .from("orders")
          .insert({
            stripe_session_id: session.id,
            customer_name: customerName,
            customer_email: customerEmail,
            shipping_address: shippingAddr.line1 || null,
            shipping_city: shippingAddr.city || null,
            shipping_state: shippingAddr.state || null,
            shipping_zip: shippingAddr.postal_code || null,
            subtotal: subtotal,
            shipping_cost: shippingCost > 0 ? shippingCost : 0,
            total: total,
            status: "paid",
          })
          .select("id")
          .single();

        if (insertErr) {
          results.push(`Failed to create order for session ${session.id}: ${insertErr.message}`);
          continue;
        }

        // Fetch line items for this session
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });

          for (const item of lineItems.data) {
            await supabaseAdmin.from("order_items").insert({
              order_id: newOrder.id,
              product_name: item.description || "Unknown Product",
              quantity: item.quantity || 1,
              unit_price: (item.price?.unit_amount || 0) / 100,
            });
          }
        } catch (lineErr: any) {
          results.push(`Could not fetch line items for session ${session.id}: ${lineErr.message}`);
        }

        created++;
        results.push(`Created missing order for ${customerEmail} ($${total.toFixed(2)})`);
      }

      hasMore = sessions.has_more;
      if (sessions.data.length > 0) {
        startingAfter = sessions.data[sessions.data.length - 1].id;
      } else {
        hasMore = false;
      }
    }

    return new Response(
      JSON.stringify({ synced, removed, created, total: (orders || []).length, details: results }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Stripe sync error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
