import { Trash2, CreditCard, Clock, FileText, User, MapPin, Package } from "lucide-react";

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

const BUNDLE_ITEM_NAMES = [
  "KRIMSON FlexFit K-Diamond Kap",
  '"Achievers" KREAM Tee',
  '95th ANNIVERSARY "KREAM" Tee',
  "K-Diamond Outline Tee, Kream",
  "AI 95th Large Logo Tee",
  "KRIMSON Quarter-Zip Sweater",
  "KRIMSON Dry-Fit Polo",
  "KREAM Dry-Fit Polo",
  "KREAM K-Diamond Socks",
  "KRIMSON K-Diamond Skully",
];

const isBundleOrder = (order: Order) => {
  const names = order.items.map((i) => i.product_name);
  const matchCount = BUNDLE_ITEM_NAMES.filter((bn) =>
    names.some((n) => n.toLowerCase().includes(bn.toLowerCase().slice(0, 15)))
  ).length;
  return matchCount >= 7 || order.total === 259;
};

const OrderDetail = ({
  order,
  onDelete,
  onClose,
}: {
  order: Order;
  onDelete: (id: string, name: string) => void;
  onClose: () => void;
}) => {
  const createdDate = new Date(order.created_at);
  const isBundle = isBundleOrder(order);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="border-t border-border px-4 py-5 bg-muted/5 space-y-5">
      {/* Charged to header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">
            Charged to {order.customer_name}
          </span>
          <span className="text-xs px-2 py-0.5 border border-border bg-muted/30 text-muted-foreground uppercase tracking-wider">
            {order.status}
          </span>
        </div>
        <button
          onClick={() => onDelete(order.id, order.customer_name)}
          className="flex items-center gap-1.5 text-xs text-destructive hover:text-destructive/80 transition-colors"
        >
          <Trash2 size={13} />
          Delete
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column: Activity + Notes */}
        <div className="lg:col-span-1 space-y-4">
          {/* Activity timeline */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
              Recent Activity
            </p>
            <div className="space-y-0 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
              <TimelineEvent
                icon={<CreditCard size={10} />}
                label="Payment authorized"
                time={formatDate(createdDate)}
              />
              <TimelineEvent
                icon={<Clock size={10} />}
                label="Payment started"
                time={formatDate(createdDate)}
              />
            </div>
          </div>

          {/* Add note placeholder */}
          <div className="border border-dashed border-border px-3 py-2.5 flex items-center gap-2 text-xs text-muted-foreground cursor-default">
            <FileText size={12} />
            <span>Add note</span>
          </div>
        </div>

        {/* Right column: Checkout Summary */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Checkout Summary
          </p>

          {/* Customer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User size={11} />
                Customer
              </div>
              <p className="text-sm">{order.customer_email}</p>
              <p className="text-sm font-medium">{order.customer_name}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={11} />
                Shipping
              </div>
              <p className="text-sm">{order.shipping_address}</p>
              <p className="text-sm">
                {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
              </p>
              {order.shipping_method && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {order.shipping_method} · ${Number(order.shipping_cost).toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Items table */}
          <div>
            {isBundle && (
              <div className="flex items-center gap-1.5 mb-2">
                <Package size={13} className="text-muted-foreground" />
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                  95th Anniversary Complete Pack
                </span>
              </div>
            )}
            <div className="border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-3 py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                      Items
                    </th>
                    <th className="text-left px-3 py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground w-16">
                      Size
                    </th>
                    <th className="text-center px-3 py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground w-12">
                      Qty
                    </th>
                    <th className="text-right px-3 py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground w-24">
                      Unit price
                    </th>
                    <th className="text-right px-3 py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground w-24">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-2">{item.product_name}</td>
                      <td className="px-3 py-2 text-muted-foreground">{item.size || "—"}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right text-muted-foreground">
                        ${Number(item.unit_price).toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-right">
                        ${(Number(item.unit_price) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="space-y-1 text-sm w-48">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${Number(order.subtotal).toFixed(2)}</span>
              </div>
              {Number(order.shipping_cost) > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${Number(order.shipping_cost).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold border-t border-border pt-1">
                <span>Total</span>
                <span>${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineEvent = ({
  icon,
  label,
  time,
}: {
  icon: React.ReactNode;
  label: string;
  time: string;
}) => (
  <div className="flex items-start gap-3 py-1.5 relative z-10">
    <div className="w-4 h-4 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

export default OrderDetail;
