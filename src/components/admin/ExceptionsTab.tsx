import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, UserPlus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export interface ExceptionItem {
  id: string;
  customer_name: string;
  product_name: string;
  size: string | null;
  quantity: number;
  created_at: string;
}

interface ExceptionsTabProps {
  onExceptionsLoaded: (items: ExceptionItem[]) => void;
}

const ExceptionsTab = ({ onExceptionsLoaded }: ExceptionsTabProps) => {
  const [exceptions, setExceptions] = useState<ExceptionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExceptions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-orders", {
        body: { action: "get_exceptions" },
      });
      if (error) throw error;
      const items = data.exceptions || [];
      setExceptions(items);
      onExceptionsLoaded(items);
    } catch (err) {
      console.error("Failed to fetch exceptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExceptions();
  }, []);

  const deleteCustomer = async (customerName: string) => {
    if (!confirm(`Remove ALL exception items for "${customerName}"? This cannot be undone.`)) return;
    try {
      const { error } = await supabase.functions.invoke("admin-orders", {
        body: { action: "delete_exception_customer", customerName },
      });
      if (error) throw error;
      const updated = exceptions.filter((e) => e.customer_name !== customerName);
      setExceptions(updated);
      onExceptionsLoaded(updated);
      toast.success(`All items for ${customerName} removed.`);
    } catch (err) {
      console.error("Delete exception customer error:", err);
      toast.error("Failed to delete.");
    }
  };

  const deleteSingleItem = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke("admin-orders", {
        body: { action: "delete_exception", exceptionId: id },
      });
      if (error) throw error;
      const updated = exceptions.filter((e) => e.id !== id);
      setExceptions(updated);
      onExceptionsLoaded(updated);
      toast.success("Item removed.");
    } catch (err) {
      console.error("Delete exception error:", err);
      toast.error("Failed to delete.");
    }
  };

  const getUnitLabel = (name: string, qty: number) => {
    const lower = name.toLowerCase();
    if (lower.includes("hat") || lower.includes("fitted") || lower.includes("kap") || lower.includes("bucket")) return qty === 1 ? "hat" : "hats";
    if (lower.includes("sock")) return qty === 1 ? "pair" : "pairs";
    if (lower.includes("skully")) return qty === 1 ? "skully" : "skullies";
    return qty === 1 ? "pc" : "pcs";
  };

  // Group by customer
  const grouped = exceptions.reduce<Record<string, ExceptionItem[]>>((acc, e) => {
    if (!acc[e.customer_name]) acc[e.customer_name] = [];
    acc[e.customer_name].push(e);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Exceptions
          </h2>
          <span className="text-xs text-muted-foreground">
            {Object.keys(grouped).length} customers · {exceptions.length} items
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={14} />
          <span>Bypasses Stripe sync — always in inventory</span>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p className="text-sm text-muted-foreground">No exceptions added.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([customer, items]) => (
            <div key={customer} className="border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-b border-border">
                <div className="flex items-center gap-2">
                  <UserPlus size={16} className="text-muted-foreground" />
                  <span className="font-medium text-sm">{customer}</span>
                  <span className="text-xs text-muted-foreground">({items.length} items)</span>
                </div>
                <button
                  onClick={() => deleteCustomer(customer)}
                  className="text-destructive hover:text-destructive/80 transition-colors text-xs flex items-center gap-1"
                >
                  <Trash2 size={13} />
                  Remove all
                </button>
              </div>
              <div className="divide-y divide-border">
                {items.map((item) => {
                  const unit = getUnitLabel(item.product_name, item.quantity);
                  const sizeLabel = item.size && item.size !== "One Size" ? `, size ${item.size}` : item.size === "One Size" ? " (One Size)" : "";
                  return (
                    <div key={item.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{item.product_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.quantity} {unit}{sizeLabel}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteSingleItem(item.id)}
                        className="text-destructive/60 hover:text-destructive transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExceptionsTab;
