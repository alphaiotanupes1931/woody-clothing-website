import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Mail, Users, TrendingUp, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string;
}

const Admin = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"subscribers" | "overview">("overview");

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

  useEffect(() => {
    fetchSubscribers();
  }, []);

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

  const todayCount = subscribers.filter(
    (s) => new Date(s.subscribed_at).toDateString() === new Date().toDateString()
  ).length;

  const weekCount = subscribers.filter(
    (s) => Date.now() - new Date(s.subscribed_at).getTime() < 7 * 86400000
  ).length;

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
          <button
            onClick={fetchSubscribers}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 flex gap-0">
          {(["overview", "subscribers"] as const).map((t) => (
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
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<Users size={20} />} label="Total Subscribers" value={subscribers.length} />
              <StatCard icon={<TrendingUp size={20} />} label="This Week" value={weekCount} />
              <StatCard icon={<Mail size={20} />} label="Today" value={todayCount} />
            </div>

            {/* Recent signups */}
            <div>
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Recent Signups
              </h2>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : subscribers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No subscribers yet.</p>
              ) : (
                <div className="space-y-2">
                  {subscribers.slice(0, 10).map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between border border-border px-4 py-3 text-sm"
                    >
                      <span className="font-medium">{s.email}</span>
                      <span className="text-muted-foreground text-xs">
                        {new Date(s.subscribed_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
                      <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                        Source
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium">{s.email}</td>
                        <td className="px-4 py-3 text-muted-foreground capitalize">{s.source || "popup"}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(s.subscribed_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
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

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="border border-border p-6 space-y-2">
    <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs font-semibold tracking-[0.15em] uppercase">{label}</span></div>
    <p className="font-display text-4xl">{value}</p>
  </div>
);

export default Admin;
