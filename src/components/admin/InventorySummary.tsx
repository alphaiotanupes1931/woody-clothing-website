import { useMemo, useState } from "react";
import { Download, Package, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
}

const InventorySummary = ({ orders, loading }: { orders: Order[]; loading: boolean }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

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

  const exportInventoryCSV = () => {
    const rows = ["Product,Total Qty,Size Breakdown"];
    summary.forEach((p) => {
      const sizeStr = Object.entries(p.sizes)
        .map(([s, q]) => `${q} ${s}`)
        .join("; ");
      rows.push(`"${p.name}",${p.totalQty},"${sizeStr}"`);
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
            {summary.length} products · {totalItems} total pcs
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
          {summary.map((p) => (
            <div key={p.name} className="border border-border px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-muted-foreground" />
                  <span className="font-medium text-sm">{p.name}</span>
                </div>
                <span className="text-sm font-semibold">{p.totalQty} pcs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(p.sizes)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([size, qty]) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-border bg-muted/20"
                    >
                      <span className="font-semibold">{qty}</span>
                      <span className="text-muted-foreground">{size}</span>
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventorySummary;
