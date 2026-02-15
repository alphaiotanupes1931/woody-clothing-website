// Tees
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";

// Polos
import kreamWovenPolo from "@/assets/products/kream-woven-polo.jpg";
import krimsonWovenPolo from "@/assets/products/krimson-woven-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";

// Headwear
import krimsonBucketFront from "@/assets/products/krimson-bucket-front.jpg";
import krimsonFittedBack from "@/assets/products/krimson-fitted-back.jpg";
import krimsonFittedFront1 from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide2 from "@/assets/products/krimson-fitted-side-2.jpg";
import krimsonSkully from "@/assets/products/krimson-skully.jpg";
import flexKreamKap from "@/assets/products/flex-kream-kap.jpg";
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";

// Outerwear
import ktrZip from "@/assets/products/ktr-zip.jpg";

// Accessories
import kreamSocks from "@/assets/products/kream-socks.jpg";

export interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  category: string;
  soldOut?: boolean;
  description?: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawProducts = [
  { image: kreamTeeAchievers, name: '"Achievers" KREAM Tee', price: "$55.00", category: "Tees", description: "Heavyweight 6.5 oz cotton tee featuring the iconic \"Achievers of the Impossible\" graphic across the back. Relaxed boxy fit with ribbed crew neck. Pre-shrunk and garment-dyed in cream for a lived-in feel from day one." },
  { image: kreamTeeCorner, name: "K-Diamond KREAM Tee", price: "$55.00", category: "Tees", description: "Clean and classic. This premium cotton tee features the signature K-Diamond emblem on the left chest in krimson. Oversized fit, drop shoulders, and a reinforced collar that holds its shape wash after wash." },
  { image: tee95thFront, name: '95th ANNIVERSARY "KREAM" Tee — Cream', price: "$65.00", category: "Tees", description: "Limited-edition tee celebrating 95 years of Alpha Iota, 1931–2026. Front features the commemorative crest in krimson on a cream base. Heavyweight 7 oz cotton, boxy cut, and screen-printed with water-based inks for a soft hand feel." },
  { image: tee95thBack, name: '95th ANNIVERSARY "KREAM" Tee — Back Print', price: "$65.00", category: "Tees", description: "The back print edition of our 95th Anniversary tee. Bold anniversary graphic spanning the full back panel with \"Achievers\" script. Same premium heavyweight cotton and relaxed silhouette as the front-print version." },
  { image: kreamTee1, name: "K-Diamond Outline Tee — Cream", price: "$55.00", category: "Tees", description: "Minimalist take on the K-Diamond logo with a clean outline print on the left chest. 100% ring-spun cotton in cream. Relaxed fit with a slightly longer body for easy layering under flannels or jackets." },
  { image: kreamTee2, name: "K-Diamond Filled Tee — Cream", price: "$55.00", category: "Tees", description: "The filled version of our signature K-Diamond emblem — solid krimson print on cream cotton. Same premium construction as the outline version with reinforced shoulder seams and a tag-free neck label for comfort." },
  { image: kreamWovenPolo, name: "KREAM Woven Polo", price: "$75.00", category: "Polos", description: "Elevated woven polo in cream with the K-Diamond logo embroidered on the left chest. Structured collar, mother-of-pearl buttons, and a tailored fit that works for chapter events, game days, or date night. 60% cotton, 40% polyester blend." },
  { image: krimsonWovenPolo, name: "KRIMSON Woven Polo", price: "$75.00", category: "Polos", description: "Our signature woven polo in deep krimson. Features the K-Diamond embroidery in cream on the left chest. Same structured collar and tailored fit as the KREAM version. Wrinkle-resistant fabric keeps you looking sharp all day." },
  { image: kreamPerformancePolo, name: "KREAM Performance Polo", price: "$75.00", category: "Polos", description: "Built for movement. Moisture-wicking performance fabric in cream with four-way stretch and UPF 30 sun protection. K-Diamond logo heat-pressed on the chest. Ideal for the golf course, cookouts, or anytime you need to look polished while staying cool." },
  { image: dryFitPolo, name: "KRIMSON Dry-Fit Polo", price: "$75.00", category: "Polos", description: "Lightweight dry-fit polo in krimson with breathable mesh side panels. Anti-odor technology and quick-dry fabric keep you fresh through long days. K-Diamond embroidery on the chest. Athletic fit with ribbed sleeve cuffs." },
  { image: krimsonFittedFront1, name: "KRIMSON K-Diamond Fitted Hat", price: "$55.00", category: "Headwear", description: "Structured six-panel fitted cap in krimson with the K-Diamond patch front and center. Premium wool blend, embroidered eyelets, and a satin-lined interior. Flat brim with a green undervisor for that classic look." },
  { image: krimsonFittedSide2, name: 'KRIMSON "Achievers" Fitted Hat — Side', price: "$55.00", category: "Headwear", description: "Side-profile view of our fitted hat featuring the \"Achievers of the Impossible\" embroidery along the right panel. Same premium wool blend construction with satin lining and embroidered eyelets. Built to break in beautifully over time." },
  { image: krimsonFittedBack, name: "KRIMSON Fitted Hat — Back", price: "$55.00", category: "Headwear", description: "Back view showcasing the clean finish of our fitted hat. Features a tonal rear embroidery detail and the AI Nupes wordmark above the sweatband. No adjustable strap — true fitted sizing for a locked-in feel." },
  { image: krimsonBucketFront, name: "KRIMSON K-Diamond Bucket Hat", price: "$45.00", category: "Headwear", description: "Casual bucket hat in krimson with the K-Diamond patch on the front panel. Soft cotton twill construction with a short, downturned brim for sun coverage. Metal eyelets for ventilation. One size fits most with a comfortable interior sweatband." },
  { image: krimsonSkully, name: "KRIMSON K-Diamond Skully", price: "$35.00", category: "Headwear", description: "Ribbed-knit skully beanie in krimson with the K-Diamond logo embroidered at the cuff. Soft acrylic blend that stretches to fit. Fold the cuff up or pull it down for a slouch fit — works either way. Essential cold-weather gear." },
  { image: flexKreamKap, name: "KREAM FlexFit K-Diamond Kap", price: "$45.00", category: "Headwear", description: "FlexFit stretch-fit cap in cream with the K-Diamond patch on the front. Curved brim, athletic fit, and the signature FlexFit band for a comfortable, no-adjust-needed fit. Perfect for everyday wear." },
  { image: flexKrimsonKap, name: "KRIMSON FlexFit K-Diamond Kap", price: "$45.00", category: "Headwear", description: "FlexFit stretch-fit cap in krimson with cream K-Diamond patch. Same comfortable stretch-band construction as the KREAM version. Mid-profile crown with a pre-curved brim. Easy to wear, hard to take off." },
  { image: ktrZip, name: "KRIMSON Quarter-Zip Sweater", price: "$95.00", category: "Outerwear", description: "Polished quarter-zip pullover in krimson with the K-Diamond logo embroidered at the left chest. Soft-brushed fleece interior for warmth without bulk. Stand-up collar, ribbed cuffs, and a straight hem. Layer it over a polo or tee for chapter events, travel, or everyday wear." },
  { image: kreamSocks, name: "KREAM K-Diamond Socks", price: "$18.00", category: "Accessories", description: "Crew-length socks in cream with the K-Diamond logo knitted at the calf. Cushioned sole, reinforced heel and toe, and a ribbed cuff that stays up all day. Fits sizes 8–13. The finishing touch to any fit." },
];

export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  id: slugify(p.name),
}));

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}
