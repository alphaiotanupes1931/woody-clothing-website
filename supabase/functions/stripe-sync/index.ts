import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const isRefundedIntent = (intent: any) => {
  if (!intent || typeof intent !== "object") return false;

  const latestCharge = intent.latest_charge;
  const refundedOnCharge =
    latestCharge &&
    typeof latestCharge === "object" &&
    ((latestCharge.refunded === true) || Number(latestCharge.amount_refunded || 0) > 0);

  return refundedOnCharge || Number(intent.amount_received || 0) <= 0;
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

    const body = await req.json().catch(() => ({}));
    const recoverMissing = body?.recoverMissing === true;

    const results: string[] = [];
    let synced = 0;
    let removed = 0;
    let created = 0;

    // Step 1: validate local orders against Stripe and remove unpaid/refunded
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("id, stripe_session_id, customer_name, customer_email")
      .order("created_at", { ascending: false })
      .limit(300);

    if (ordersError) throw ordersError;

    const knownSessionIds = new Set<string>();

    for (const order of orders || []) {
      if (!order.stripe_session_id) continue;
      knownSessionIds.add(order.stripe_session_id);

      try {
        const session = await stripe.checkout.sessions.retrieve(order.stripe_session_id, {
          expand: ["payment_intent.latest_charge"],
        });

        const paymentIntent = (session as any).payment_intent;
        const isRefunded = isRefundedIntent(paymentIntent);
        const isPaid = session.payment_status === "paid";

        if (!isPaid || isRefunded) {
          await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);
          await supabaseAdmin.from("orders").delete().eq("id", order.id);
          removed++;
          results.push(`Removed ${isRefunded ? "refunded" : "unpaid"} order ${order.id}`);
          continue;
        }

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

        if (paymentIntent && typeof paymentIntent === "object" && paymentIntent.amount_received) {
          updateData.total = Number(paymentIntent.amount_received) / 100;
        }

        await supabaseAdmin.from("orders").update(updateData).eq("id", order.id);
        synced++;
      } catch (stripeErr: any) {
        if (stripeErr?.statusCode === 404) {
          await supabaseAdmin.from("order_items").delete().eq("order_id", order.id);
          await supabaseAdmin.from("orders").delete().eq("id", order.id);
          removed++;
          results.push(`Removed stale order ${order.id}`);
        } else {
          results.push(`Stripe error for ${order.id}: ${stripeErr?.message || "Unknown error"}`);
        }
      }
    }

    // Step 2 (optional): recover missing paid sessions from Stripe
    if (recoverMissing) {
      let hasMore = true;
      let startingAfter: string | undefined;
      let pageCount = 0;

      while (hasMore && pageCount < 5) {
        const params: any = {
          limit: 100,
          status: "complete",
          expand: ["data.payment_intent.latest_charge"],
        };
        if (startingAfter) params.starting_after = startingAfter;

        const sessions = await stripe.checkout.sessions.list(params);

        for (const session of sessions.data) {
          if (session.payment_status !== "paid") continue;
          if (knownSessionIds.has(session.id)) continue;

          const paymentIntent = (session as any).payment_intent;
          if (isRefundedIntent(paymentIntent)) continue;

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
              subtotal,
              shipping_cost: shippingCost > 0 ? shippingCost : 0,
              total,
              status: "paid",
            })
            .select("id")
            .single();

          if (insertErr) {
            results.push(`Failed to create order for session ${session.id}: ${insertErr.message}`);
            continue;
          }

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
            results.push(`Could not fetch line items for session ${session.id}: ${lineErr?.message || "Unknown error"}`);
          }

          knownSessionIds.add(session.id);
          created++;
        }

        hasMore = sessions.has_more;
        if (sessions.data.length > 0) {
          startingAfter = sessions.data[sessions.data.length - 1].id;
        } else {
          hasMore = false;
        }

        pageCount++;
      }
    }

    return new Response(
      JSON.stringify({
        synced,
        removed,
        created,
        recoverMissing,
        totalChecked: (orders || []).length,
        details: results,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Stripe sync error:", error);
    return new Response(JSON.stringify({ error: error?.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
