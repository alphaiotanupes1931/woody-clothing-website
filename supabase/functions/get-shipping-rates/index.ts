import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ORIGIN_ZIP = "20613";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const shippoKey = Deno.env.get("SHIPPO_API_KEY");
    if (!shippoKey) throw new Error("SHIPPO_API_KEY not configured");

    const { destZip, destState, destCity, weight, length, width, height } = await req.json();

    if (!destZip) throw new Error("Destination zip code is required");

    // Create a Shippo shipment to get rates
    const shipmentRes = await fetch("https://api.goshippo.com/shipments/", {
      method: "POST",
      headers: {
        Authorization: `ShippoToken ${shippoKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address_from: {
          zip: ORIGIN_ZIP,
          state: "MD",
          city: "Brandywine",
          country: "US",
        },
        address_to: {
          zip: destZip,
          state: destState || "",
          city: destCity || "",
          country: "US",
        },
        parcels: [
          {
            length: String(length || 12),
            width: String(width || 9),
            height: String(height || 2),
            distance_unit: "in",
            weight: String(weight || 1),
            mass_unit: "lb",
          },
        ],
        async: false,
      }),
    });

    if (!shipmentRes.ok) {
      const errText = await shipmentRes.text();
      console.error("Shippo API error:", errText);
      throw new Error("Shippo API error");
    }

    const shipment = await shipmentRes.json();

    // Filter to USPS rates only and map to the services we want
    const uspsServiceMap: Record<string, { label: string; estimate: string; priority: number }> = {
      "usps_ground_advantage": { label: "USPS Ground Advantage", estimate: "2–5 business days", priority: 3 },
      "usps_priority": { label: "USPS Priority Mail", estimate: "1–3 business days", priority: 2 },
      "usps_priority_express": { label: "USPS Priority Mail Express", estimate: "1–2 business days (overnight)", priority: 1 },
    };

    const rates = (shipment.rates || [])
      .filter((r: any) => r.provider === "USPS")
      .map((r: any) => {
        const key = r.servicelevel?.token || "";
        const mapped = uspsServiceMap[key];
        if (!mapped) return null;
        return {
          id: r.object_id,
          service: key,
          label: mapped.label,
          estimate: mapped.estimate,
          price: parseFloat(r.amount),
          currency: r.currency,
          priority: mapped.priority,
        };
      })
      .filter(Boolean)
      .sort((a: any, b: any) => b.priority - a.priority); // cheapest last → Ground first

    return new Response(JSON.stringify({ rates }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Shipping rates error:", error);
    // Return fallback flat rate
    return new Response(
      JSON.stringify({
        rates: [
          {
            id: "fallback",
            service: "flat_rate",
            label: "Standard Shipping",
            estimate: "5–7 business days",
            price: 9.99,
            currency: "USD",
            priority: 3,
          },
        ],
        fallback: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
});
