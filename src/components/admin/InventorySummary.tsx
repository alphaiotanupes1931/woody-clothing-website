import { useMemo, useState, useEffect } from "react";
import { Download, Package, CalendarIcon, Loader2, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface OrderItem {
  id: string;
  product_name: string;
  product_id: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  created_at: string;
  items: OrderItem[];
}

interface ProductSummary {
  name: string;
  totalQty: number;
  sizes: Record<string, number>;
  hasExceptions?: boolean;
}

interface ExceptionItem {
  id: string;
  customer_name: string;
  product_name: string;
  size: string | null;
  quantity: number;
  created_at: string;
}

const InventorySummary = ({ orders, loading, exceptionItems = [] }: { orders: Order[]; loading: boolean; exceptionItems?: ExceptionItem[] }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [shippedMap, setShippedMap] = useState<Record<string, boolean>>({});
  const [togglingProduct, setTogglingProduct] = useState<string | null>(null);

  // Fetch shipped statuses on mount
  useEffect(() => {
    const fetchShipped = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("admin-orders", {
          body: { action: "get_shipped" },
        });
        if (error) throw error;
        setShippedMap(data.shipped || {});
      } catch (err) {
        console.error("Failed to fetch shipped statuses:", err);
      }
    };
    fetchShipped();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const orderDate = new Date(o.created_at);
      if (startDate && orderDate < new Date(startDate.setHours(0, 0, 0, 0))) return false;
      if (endDate && orderDate > new Date(endDate.setHours(23, 59, 59, 999))) return false;
      return true;
    });
  }, [orders, startDate, endDate]);

  const summary = useMemo(() => {
    const map: Record<string, ProductSummary> = {};
    filteredOrders.forEach((o) =>
      o.items.forEach((item) => {
        const key = item.product_name;
        if (!map[key]) map[key] = { name: key, totalQty: 0, sizes: {} };
        map[key].totalQty += item.quantity;
        const size = item.size || "One Size";
        map[key].sizes[size] = (map[key].sizes[size] || 0) + item.quantity;
      })
    );
    return Object.values(map).sort((a, b) => b.totalQty - a.totalQty);
  }, [filteredOrders]);

  const clearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const toggleShipped = async (productName: string, newValue: boolean) => {
    setTogglingProduct(productName);
    try {
      const { error } = await supabase.functions.invoke("admin-orders", {
        body: { action: "toggle_shipped", productName, shipped: newValue },
      });
      if (error) throw error;
      setShippedMap((prev) => ({ ...prev, [productName]: newValue }));
      toast.success(`${productName} marked as ${newValue ? "shipped" : "not shipped"}`);
    } catch (err) {
      console.error("Toggle shipped error:", err);
      toast.error("Failed to update shipped status.");
    } finally {
      setTogglingProduct(null);
    }
  };

  const getUnitLabel = (name: string, qty: number) => {
    const lower = name.toLowerCase();
    if (lower.includes("hat") || lower.includes("fitted") || lower.includes("kap") || lower.includes("bucket")) return qty === 1 ? "hat" : "hats";
    if (lower.includes("sock")) return qty === 1 ? "pair" : "pairs";
    if (lower.includes("skully")) return qty === 1 ? "skully" : "skullies";
    return qty === 1 ? "pc" : "pcs";
  };

  const exportInventoryCSV = () => {
    const rows = ["Product,Total Qty,Size Breakdown,Shipped"];
    summary.forEach((p) => {
      const sizeStr = Object.entries(p.sizes)
        .map(([s, q]) => {
          const unit = getUnitLabel(p.name, q);
          return s === "One Size" ? `${q} ${unit}` : `${q} ${unit}, size ${s}`;
        })
        .join("; ");
      rows.push(`"${p.name}",${p.totalQty},"${sizeStr}",${shippedMap[p.name] ? "Yes" : "No"}`);
    });
    const dateLabel = startDate || endDate
      ? `_${startDate ? format(startDate, "yyyy-MM-dd") : "start"}-${endDate ? format(endDate, "yyyy-MM-dd") : "end"}`
      : "";
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory-summary${dateLabel}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalItems = summary.reduce((s, p) => s + p.totalQty, 0);
  const shippedCount = summary.filter((p) => shippedMap[p.name]).length;

  return (
    <div className="space-y-4">
      {/* Date Range Filters */}
      <div className="flex flex-wrap items-end gap-3 border border-border p-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            From
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal h-9 text-sm",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            To
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal h-9 text-sm",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {(startDate || endDate) && (
          <button
            onClick={clearDates}
            className="text-xs text-muted-foreground hover:text-foreground underline transition-colors pb-1"
          >
            Clear dates
          </button>
        )}

        {(startDate || endDate) && (
          <span className="text-xs text-muted-foreground pb-1 ml-auto">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Inventory Summary
          </h2>
          <span className="text-xs text-muted-foreground">
            {summary.length} products · {totalItems} total pcs · {shippedCount} shipped
          </span>
        </div>
        <button
          onClick={exportInventoryCSV}
          disabled={summary.length === 0}
          className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-40"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : summary.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {startDate || endDate ? "No orders in this date range." : "No orders yet."}
        </p>
      ) : (
        <div className="space-y-3">
          {summary.map((p) => {
            const isShipped = !!shippedMap[p.name];
            const isToggling = togglingProduct === p.name;

            return (
              <div
                key={p.name}
                className={cn(
                  "border px-4 py-4 transition-colors",
                  isShipped ? "border-primary/30 bg-primary/5" : "border-border"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-muted-foreground" />
                    <span className={cn("font-medium text-sm", isShipped && "line-through text-muted-foreground")}>
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">{p.totalQty} pcs</span>
                    <div className="flex items-center gap-2">
                      {isToggling && <Loader2 size={14} className="animate-spin text-muted-foreground" />}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={isShipped}
                          onCheckedChange={(checked) => toggleShipped(p.name, checked)}
                          disabled={isToggling}
                        />
                        <span className={cn(
                          "text-xs font-semibold tracking-wider uppercase",
                          isShipped ? "text-primary" : "text-muted-foreground"
                        )}>
                          {isShipped ? "Shipped" : "Not Shipped"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(p.sizes)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([size, qty]) => {
                      const unit = getUnitLabel(p.name, qty);
                      const sizeLabel = size === "One Size" ? "" : `, size ${size}`;
                      return (
                        <span
                          key={size}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-border bg-muted/20"
                        >
                          <span className="font-semibold">{qty}</span>
                          <span className="text-muted-foreground">{unit}{sizeLabel}</span>
                        </span>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InventorySummary;
