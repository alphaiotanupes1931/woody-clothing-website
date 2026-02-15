import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  category: string;
}

const apparelData = [
  { size: "S", chest: '34-36"', waist: '28-30"', length: '27"' },
  { size: "M", chest: '38-40"', waist: '32-34"', length: '28"' },
  { size: "L", chest: '42-44"', waist: '36-38"', length: '29"' },
  { size: "XL", chest: '46-48"', waist: '40-42"', length: '30"' },
  { size: "2XL", chest: '50-52"', waist: '44-46"', length: '31"' },
];

const hatData = [
  { size: "6 7/8", circumference: '21 5/8"', cm: "54.9 cm" },
  { size: "7", circumference: '22"', cm: "55.9 cm" },
  { size: "7 1/8", circumference: '22 3/8"', cm: "56.8 cm" },
  { size: "7 1/4", circumference: '22 3/4"', cm: "57.8 cm" },
  { size: "7 3/8", circumference: '23 1/8"', cm: "58.7 cm" },
  { size: "7 1/2", circumference: '23 1/2"', cm: "59.7 cm" },
  { size: "7 5/8", circumference: '23 7/8"', cm: "60.6 cm" },
];

const SizeGuideModal = ({ open, onClose, category }: SizeGuideModalProps) => {
  if (!open) return null;

  const isHat = category === "Headwear";

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-background border border-border p-6 md:p-8 max-w-lg w-full relative pointer-events-auto animate-scale-in max-h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <Ruler size={18} strokeWidth={1.5} />
            <h3 className="font-display text-xl tracking-wide uppercase">
              {isHat ? "Hat" : "Apparel"} Size Guide
            </h3>
          </div>

          {isHat ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Size</th>
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Circumference</th>
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">CM</th>
                </tr>
              </thead>
              <tbody>
                {hatData.map((row) => (
                  <tr key={row.size} className="border-b border-border/50">
                    <td className="py-2.5 font-medium">{row.size}</td>
                    <td className="py-2.5 text-muted-foreground">{row.circumference}</td>
                    <td className="py-2.5 text-muted-foreground">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Size</th>
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Chest</th>
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Waist</th>
                  <th className="text-left py-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">Length</th>
                </tr>
              </thead>
              <tbody>
                {apparelData.map((row) => (
                  <tr key={row.size} className="border-b border-border/50">
                    <td className="py-2.5 font-medium">{row.size}</td>
                    <td className="py-2.5 text-muted-foreground">{row.chest}</td>
                    <td className="py-2.5 text-muted-foreground">{row.waist}</td>
                    <td className="py-2.5 text-muted-foreground">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <p className="text-[10px] text-muted-foreground mt-4">
            {isHat
              ? "Measure around the widest part of your head, just above your ears."
              : "Measurements are in inches. For the best fit, measure a similar garment you own."}
          </p>
        </div>
      </div>
    </>
  );
};

export default SizeGuideModal;