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

    const { items, shipping, metadata, customerEmail, customerName, shippingAddress, bundleItems: bundleItemsRaw } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("No items provided");
    }

    // Server-side address validation — skip for bundle/direct checkout (Stripe collects info)
    const isBundleCheckout = metadata?.bundle === "true";
    if (!isBundleCheckout) {
      if (!customerName || !customerName.trim()) {
        throw new Error("Customer name is required");
      }
      if (!customerEmail || !customerEmail.trim()) {
        throw new Error("Customer email is required");
      }
      if (!shippingAddress || !shippingAddress.address?.trim() || !shippingAddress.city?.trim() || !shippingAddress.state?.trim() || !shippingAddress.zip?.trim()) {
        throw new Error("Complete shipping address is required (street, city, state, ZIP)");
      }
    }

    // Build line items — size is already appended to name from frontend
    const line_items = items.map((item: { name: string; price: number; quantity: number; image?: string; size?: string; productId?: string }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping cost as a line item if > 0
    const shippingCost = shipping?.cost || 0;
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Shipping: ${shipping?.label || "Standard"}`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Build items detail string for Stripe metadata (sizes + quantities)
    const itemsDetail = items.map((item: any) => {
      const parts = [item.name];
      if (item.size) parts.push(`Size: ${item.size}`);
      parts.push(`Qty: ${item.quantity}`);
      parts.push(`$${item.price}`);
      return parts.join(" | ");
    }).join(" // ");

    const origin = req.headers.get("origin") || "https://lovable.dev";

    // Calculate subtotal
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;

    const sessionParams: any = {
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        shipping_service: shipping?.service || "unknown",
        shipping_label: shipping?.label || "Standard",
        shipping_estimate: shipping?.estimate || "",
        shipping_cost: String(shippingCost),
        customer_name: customerName || "",
        shipping_address: shippingAddress ? `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}` : "",
        items_detail: itemsDetail.substring(0, 500), // Stripe metadata max 500 chars
        ...(metadata || {}),
      },
      shipping_address_collection: undefined,
    };

    // Pre-fill email if provided
    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    // Attach shipping details so they appear in Stripe dashboard
    if (shippingAddress && customerName) {
      sessionParams.payment_intent_data = {
        shipping: {
          name: customerName,
          address: {
            line1: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postal_code: shippingAddress.zip,
            country: "US",
          },
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    // Save order to database
    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
      );

      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          customer_name: customerName || "",
          customer_email: customerEmail || "",
          shipping_address: shippingAddress?.address || null,
          shipping_city: shippingAddress?.city || null,
          shipping_state: shippingAddress?.state || null,
          shipping_zip: shippingAddress?.zip || null,
          shipping_method: shipping?.label || null,
          shipping_cost: shippingCost,
          subtotal,
          total,
          status: "pending",
        })
        .select("id")
        .single();

      if (orderError) {
        console.error("Order save error:", orderError);
      } else if (order) {
        // If bundle items are provided, store those instead of the single line item
        const itemsToStore = bundleItemsRaw && Array.isArray(bundleItemsRaw) && bundleItemsRaw.length > 0
          ? bundleItemsRaw
          : items;

        const orderItems = itemsToStore.map((item: any) => ({
          order_id: order.id,
          product_name: item.name.replace(/ \([^)]+\)$/, ""),
          product_id: item.productId || null,
          size: item.size || null,
          quantity: item.quantity || 1,
          unit_price: item.price || 0,
        }));

        const { error: itemsError } = await supabaseAdmin
          .from("order_items")
          .insert(orderItems);

        if (itemsError) {
          console.error("Order items save error:", itemsError);
        }
      }
    } catch (dbErr) {
      console.error("DB save error (non-blocking):", dbErr);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
