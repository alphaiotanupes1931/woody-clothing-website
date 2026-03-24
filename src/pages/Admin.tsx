import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Mail, Users, TrendingUp, RefreshCw, ShoppingBag, Package, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import InventorySummary from "@/components/admin/InventorySummary";
import OrderDetail from "@/components/admin/OrderDetail";
import AdminLogin from "@/components/admin/AdminLogin";
import ExceptionsTab, { type ExceptionItem } from "@/components/admin/ExceptionsTab";
import PhoneDirectory from "@/components/admin/PhoneDirectory";

const getGreeting = () => {
  const estHour = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })).getHours();
  if (estHour < 12) return "Good Morning";
  if (estHour < 17) return "Good Afternoon";
  return "Good Evening";
};

const TypingWelcome = () => {
  const fullText = `${getGreeting()}, Woody`;
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="border border-border p-4 sm:p-6 bg-muted/10">
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-wide">
        {displayed}
        <span
          className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
          style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
        />
      </h2>
    </div>
  );
};

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
}

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
  stripe_session_id: string | null;
  customer_name: string;
  customer_email: string;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_method: string | null;
  shipping_cost: number;
  subtotal: number;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin-auth") === "true");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [tab, setTab] = useState<"overview" | "orders" | "inventory" | "exceptions" | "subscribers" | "directory">("overview");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [exceptionItems, setExceptionItems] = useState<ExceptionItem[]>([]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-subscribers");
      if (error) throw error;
      setSubscribers(data.subscribers || []);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-orders");
      if (error) throw error;
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchExceptions = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-orders", {
        body: { action: "get_exceptions" },
      });
      if (error) throw error;
      setExceptionItems(data.exceptions || []);
    } catch (err) {
      console.error("Failed to fetch exceptions:", err);
    }
  };

  useEffect(() => {
    if (!authed) return;
    fetchSubscribers();
    fetchOrders();
    fetchExceptions();

    const channel = supabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        () => {
          console.log('New order detected, refreshing…');
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authed]);

  if (!authed) {
    return <AdminLogin onAuth={() => setAuthed(true)} />;
  }

  const refreshAll = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("stripe-sync", {
        body: { recoverMissing: true },
      });
      if (error) throw error;
      toast.success(
        `Synced: ${data.synced} verified, ${data.created || 0} recovered, ${data.removed} removed.`
      );
    } catch (err) {
      console.error("Sync error:", err);
      toast.error("Failed to sync with Stripe.");
    } finally {
      setSyncing(false);
    }
    fetchSubscribers();
    fetchOrders();
    fetchExceptions();
  };


  const deleteOrder = async (orderId: string, customerName: string) => {
    if (!confirm(`Delete order from "${customerName}"? This cannot be undone.`)) return;
    try {
      const { data, error } = await supabase.functions.invoke("admin-orders", {
        body: { action: "delete", orderId },
      });
      if (error) throw error;
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setExpandedOrder(null);
      toast.success("Order deleted.");
    } catch (err) {
      console.error("Delete order error:", err);
      toast.error("Failed to delete order.");
    }
  };

  const deleteSubscriber = async (subscriberId: string, email: string) => {
    if (!confirm(`Remove subscriber "${email}"? This cannot be undone.`)) return;
    try {
      const { data, error } = await supabase.functions.invoke("admin-subscribers", {
        body: { action: "delete", subscriberId },
      });
      if (error) throw error;
      setSubscribers((prev) => prev.filter((s) => s.id !== subscriberId));
      toast.success("Subscriber removed.");
    } catch (err) {
      console.error("Delete subscriber error:", err);
      toast.error("Failed to delete subscriber.");
    }
  };

  const exportCSV = () => {
    const csv = ["Email,Subscribed At,Source"]
      .concat(subscribers.map((s) => `${s.email},${s.subscribed_at},${s.source || "popup"}`))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getUnitLabel = (name: string, qty: number) => {
    const lower = name.toLowerCase();
    if (lower.includes("hat") || lower.includes("fitted") || lower.includes("kap") || lower.includes("bucket")) return qty === 1 ? "hat" : "hats";
    if (lower.includes("sock")) return qty === 1 ? "pair" : "pairs";
    if (lower.includes("skully")) return qty === 1 ? "skully" : "skullies";
    return qty === 1 ? "pc" : "pcs";
  };

  const exportOrdersCSV = () => {
    const agg: Record<string, number> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        const key = `${item.product_name}|||${item.size || "One Size"}`;
        agg[key] = (agg[key] || 0) + item.quantity;
      });
    });
    const rows = ["Product,Breakdown"];
    Object.entries(agg)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([key, qty]) => {
        const [name, size] = key.split("|||");
        const unit = getUnitLabel(name, qty);
        const sizeLabel = size === "One Size" ? "" : `, size ${size}`;
        rows.push(`"${name}","${qty} ${unit}${sizeLabel}"`);
      });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const todayCount = subscribers.filter(
    (s) => new Date(s.subscribed_at).toDateString() === new Date().toDateString()
  ).length;

  const weekCount = subscribers.filter(
    (s) => Date.now() - new Date(s.subscribed_at).getTime() < 7 * 86400000
  ).length;

  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const displayOrders = paidOrders;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
              ← Back
            </Link>
            <h1 className="font-display text-base sm:text-xl tracking-wider uppercase truncate">Admin Dashboard</h1>
          </div>
          <button
            onClick={refreshAll}
            disabled={syncing}
            className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-foreground text-background px-2.5 sm:px-3 py-1.5 hover:bg-foreground/90 transition-colors disabled:opacity-50 whitespace-nowrap flex-shrink-0"
          >
            <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">{syncing ? "Syncing..." : "Refresh"}</span>
            <span className="sm:hidden">{syncing ? "..." : "Sync"}</span>
          </button>
        </div>
      </div>

      {/* Tabs — horizontally scrollable on mobile */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-0 min-w-max">
            {(["overview", "orders", "inventory", "exceptions", "subscribers", "directory"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.15em] uppercase border-b-2 transition-colors whitespace-nowrap ${
                  tab === t
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        {tab === "overview" && (
          <div className="space-y-5 sm:space-y-8">
            <TypingWelcome />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={<ShoppingBag size={18} />} label="Paid Orders" value={paidOrders.length} />
              <StatCard icon={<TrendingUp size={18} />} label="Gross Income" value={`$${totalRevenue.toFixed(2)}`} />
              <StatCard icon={<Users size={18} />} label="Subscribers" value={subscribers.length} />
              <StatCard icon={<Mail size={18} />} label="This Week" value={weekCount} />
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Paid Orders ({displayOrders.length})
              </h2>
              <button
                onClick={exportOrdersCSV}
                disabled={displayOrders.length === 0}
                className="flex items-center gap-1.5 sm:gap-2 bg-foreground text-background px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-40 whitespace-nowrap flex-shrink-0"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">CSV</span>
              </button>
            </div>

            {ordersLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : displayOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No paid orders yet.</p>
            ) : (
              <div className="space-y-3">
                {displayOrders.map((o) => (
                  <div key={o.id} className="border border-border overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}
                      className="w-full text-left px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between hover:bg-muted/20 transition-colors gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                          <span className="font-medium text-sm truncate">{o.customer_name}</span>
                          <span className="text-xs text-muted-foreground truncate">{o.customer_email}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {o.items.map((i) => {
                            const parts = [i.product_name];
                            if (i.size) parts.push(`(${i.size})`);
                            parts.push(`x${i.quantity}`);
                            return parts.join(" ");
                          }).join(", ")}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="font-medium text-sm">${Number(o.total).toFixed(2)}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">
                          {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                      </div>
                    </button>

                    {expandedOrder === o.id && (
                      <OrderDetail
                        order={o}
                        onDelete={deleteOrder}
                        onClose={() => setExpandedOrder(null)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "inventory" && (
          <InventorySummary orders={paidOrders} loading={ordersLoading} exceptionItems={exceptionItems} />
        )}

        {tab === "exceptions" && (
          <ExceptionsTab onExceptionsLoaded={setExceptionItems} />
        )}

        {tab === "subscribers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Subscribers ({subscribers.length})
              </h2>
              <button
                onClick={exportCSV}
                disabled={subscribers.length === 0}
                className="flex items-center gap-1.5 sm:gap-2 bg-foreground text-background px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-40 whitespace-nowrap flex-shrink-0"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">CSV</span>
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : subscribers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No subscribers yet.</p>
            ) : (
              <>
                {/* Desktop table */}
                <div className="border border-border overflow-hidden hidden sm:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Email</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Source</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Date</th>
                        <th className="text-right px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((s) => (
                        <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-medium">{s.email}</td>
                          <td className="px-4 py-3 text-muted-foreground capitalize">{s.source || "popup"}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(s.subscribed_at).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => deleteSubscriber(s.id, s.email)}
                              className="text-destructive hover:text-destructive/80 transition-colors"
                              title="Delete subscriber"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card list */}
                <div className="sm:hidden space-y-2">
                  {subscribers.map((s) => (
                    <div key={s.id} className="border border-border p-3 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{s.email}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {s.source || "popup"} · {new Date(s.subscribed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteSubscriber(s.id, s.email)}
                        className="text-destructive hover:text-destructive/80 transition-colors flex-shrink-0 mt-0.5"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) => (
  <div className="border border-border p-3 sm:p-6 space-y-1 sm:space-y-2">
    <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
      {icon}
      <span className="text-[10px] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase truncate">{label}</span>
    </div>
    <p className="font-display text-2xl sm:text-4xl">{value}</p>
  </div>
);

export default Admin;
