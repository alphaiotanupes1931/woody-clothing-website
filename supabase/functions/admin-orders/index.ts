import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 500): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, delay * (i + 1)));
    }
  }
  throw new Error("Unreachable");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    const body = await req.json().catch(() => ({}));

    // Handle delete action
    if (body.action === "delete") {
      const { orderId } = body;
      if (!orderId) throw new Error("orderId is required");

      await supabaseAdmin.from("order_items").delete().eq("order_id", orderId);
      const { error } = await supabaseAdmin.from("orders").delete().eq("id", orderId);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle shipped status toggle
    if (body.action === "toggle_shipped") {
      const { productName, shipped } = body;
      if (!productName) throw new Error("productName is required");

      const { error } = await supabaseAdmin
        .from("inventory_shipped")
        .upsert(
          { product_name: productName, shipped: !!shipped, updated_at: new Date().toISOString() },
          { onConflict: "product_name" }
        );
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle get shipped statuses
    if (body.action === "get_shipped") {
      const { data, error } = await supabaseAdmin
        .from("inventory_shipped")
        .select("product_name, shipped");
      if (error) throw error;

      const map: Record<string, boolean> = {};
      (data || []).forEach((r: any) => { map[r.product_name] = r.shipped; });

      return new Response(JSON.stringify({ shipped: map }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // === EXCEPTIONS CRUD ===
    if (body.action === "get_exceptions") {
      const { data, error } = await supabaseAdmin
        .from("order_exceptions")
        .select("*")
        .order("customer_name", { ascending: true })
        .order("product_name", { ascending: true });
      if (error) throw error;

      return new Response(JSON.stringify({ exceptions: data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.action === "add_exception") {
      const { customer_name, product_name, size, quantity } = body;
      if (!customer_name || !product_name) throw new Error("customer_name and product_name required");

      const { data, error } = await supabaseAdmin
        .from("order_exceptions")
        .insert({ customer_name, product_name, size: size || null, quantity: quantity || 1 })
        .select()
        .single();
      if (error) throw error;

      return new Response(JSON.stringify({ success: true, exception: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.action === "delete_exception") {
      const { exceptionId } = body;
      if (!exceptionId) throw new Error("exceptionId is required");

      const { error } = await supabaseAdmin
        .from("order_exceptions")
        .delete()
        .eq("id", exceptionId);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (body.action === "delete_exception_customer") {
      const { customerName } = body;
      if (!customerName) throw new Error("customerName is required");

      const { error } = await supabaseAdmin
        .from("order_exceptions")
        .delete()
        .eq("customer_name", customerName);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET: Fetch orders with their items
    const { data: orders, error: ordersError } = await withRetry(() =>
      supabaseAdmin
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200)
    );

    if (ordersError) throw ordersError;

    const orderIds = (orders || []).map((o: any) => o.id);
    let items: any[] = [];
    if (orderIds.length > 0) {
      const { data: itemsData, error: itemsError } = await withRetry(() =>
        supabaseAdmin
          .from("order_items")
          .select("*")
          .in("order_id", orderIds)
      );

      if (itemsError) throw itemsError;
      items = itemsData || [];
    }

    const ordersWithItems = (orders || []).map((order: any) => ({
      ...order,
      items: items.filter((i: any) => i.order_id === order.id),
    }));

    return new Response(JSON.stringify({ orders: ordersWithItems }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Admin orders error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
