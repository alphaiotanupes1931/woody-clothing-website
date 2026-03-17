import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Mail, Users, TrendingUp, RefreshCw, ShoppingBag, Package, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import InventorySummary from "@/components/admin/InventorySummary";
import OrderDetail from "@/components/admin/OrderDetail";
import AdminLogin from "@/components/admin/AdminLogin";

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
    <div className="border border-border p-6 bg-muted/10">
      <h2 className="font-display text-3xl sm:text-4xl tracking-wide">
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
  const [tab, setTab] = useState<"overview" | "orders" | "inventory" | "subscribers">("overview");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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

  useEffect(() => {
    if (!authed) return;
    fetchSubscribers();
    fetchOrders();

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
      const { data, error } = await supabase.functions.invoke("stripe-sync");
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
  };

  const syncWithStripe = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("stripe-sync");
      if (error) throw error;
      toast.success(
        `Stripe sync complete: ${data.synced} verified, ${data.created || 0} recovered, ${data.removed} removed.`
      );
      await fetchOrders();
    } catch (err) {
      console.error("Stripe sync error:", err);
      toast.error("Failed to sync with Stripe.");
    } finally {
      setSyncing(false);
    }
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

  const exportOrdersCSV = () => {
    const rows = ["Order Date,Customer,Email,Address,Items,Sizes,Subtotal,Shipping,Total,Status"];
    orders.forEach((o) => {
      const itemNames = o.items.map((i) => `${i.product_name} x${i.quantity}`).join("; ");
      const sizes = o.items.map((i) => i.size || "N/A").join("; ");
      const addr = [o.shipping_address, o.shipping_city, o.shipping_state, o.shipping_zip].filter(Boolean).join(", ");
      rows.push(`"${new Date(o.created_at).toLocaleDateString()}","${o.customer_name}","${o.customer_email}","${addr}","${itemNames}","${sizes}",${o.subtotal},${o.shipping_cost},${o.total},${o.status}`);
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
  // Only show paid orders throughout the dashboard
  const displayOrders = paidOrders;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to site
            </Link>
            <h1 className="font-display text-xl tracking-wider uppercase">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={syncWithStripe}
              disabled={syncing}
              className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-foreground text-background px-3 py-1.5 hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              <CheckCircle size={13} className={syncing ? "animate-pulse" : ""} />
              {syncing ? "Syncing..." : "Verify with Stripe"}
            </button>
            <button
              onClick={refreshAll}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw size={14} className={loading || ordersLoading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 flex gap-0">
          {(["overview", "orders", "inventory", "subscribers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase border-b-2 transition-colors ${
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {tab === "overview" && (
          <div className="space-y-8">
            <TypingWelcome />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={<ShoppingBag size={20} />} label="Paid Orders" value={paidOrders.length} />
              <StatCard icon={<TrendingUp size={20} />} label="Gross Income" value={`$${totalRevenue.toFixed(2)}`} />
              <StatCard icon={<Users size={20} />} label="Subscribers" value={subscribers.length} />
              <StatCard icon={<Mail size={20} />} label="Signups This Week" value={weekCount} />
            </div>

          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Paid Orders ({displayOrders.length})
              </h2>
              <button
                onClick={exportOrdersCSV}
                disabled={displayOrders.length === 0}
                className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-40"
              >
                <Download size={14} />
                Export CSV
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
                      className="w-full text-left px-4 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-sm">{o.customer_name}</span>
                          <span className="text-xs text-muted-foreground">{o.customer_email}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {o.items.map((i) => {
                            const parts = [i.product_name];
                            if (i.size) parts.push(`(${i.size})`);
                            parts.push(`x${i.quantity}`);
                            return parts.join(" ");
                          }).join(", ")}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <div className="font-medium text-sm">${Number(o.total).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
          <InventorySummary orders={paidOrders} loading={ordersLoading} />
        )}

        {tab === "subscribers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                All Subscribers ({subscribers.length})
              </h2>
              <button
                onClick={exportCSV}
                disabled={subscribers.length === 0}
                className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-40"
              >
                <Download size={14} />
                Export CSV
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : subscribers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No subscribers yet.</p>
            ) : (
              <div className="border border-border overflow-hidden">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) => (
  <div className="border border-border p-6 space-y-2">
    <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs font-semibold tracking-[0.15em] uppercase">{label}</span></div>
    <p className="font-display text-4xl">{value}</p>
  </div>
);

export default Admin;
