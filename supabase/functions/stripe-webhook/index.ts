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

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Fallback: parse directly (less secure, for testing)
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const sessionId = session.id;

    const customerName =
      session.shipping_details?.name ||
      session.customer_details?.name ||
      session.metadata?.customer_name ||
      "";

    const customerEmail =
      session.customer_details?.email ||
      session.customer_email ||
      "";

    const shippingAddr = session.shipping_details?.address || {};

    const updateData: Record<string, any> = {
      status: "paid",
    };

    if (customerName) updateData.customer_name = customerName;
    if (customerEmail) updateData.customer_email = customerEmail;
    if (shippingAddr.line1) updateData.shipping_address = shippingAddr.line1;
    if (shippingAddr.city) updateData.shipping_city = shippingAddr.city;
    if (shippingAddr.state) updateData.shipping_state = shippingAddr.state;
    if (shippingAddr.postal_code) updateData.shipping_zip = shippingAddr.postal_code;

    const { error } = await supabaseAdmin
      .from("orders")
      .update(updateData)
      .eq("stripe_session_id", sessionId);

    if (error) {
      console.error("Failed to update order:", error);
      return new Response(JSON.stringify({ error: "DB update failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Order updated for session ${sessionId}: status=paid, name=${customerName}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
