// Tees
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee95thBack from "@/assets/products/kream-tee-95th-back.jpg";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";

// Lifestyle shots
import lifestyleAchievers from "@/assets/lifestyle/lifestyle-achievers.jpg";
import lifestyleKdiamondFront2 from "@/assets/lifestyle/lifestyle-kdiamond-front-2.jpg";
import lifestyle95thFront from "@/assets/lifestyle/lifestyle-95th-front.jpg";
import lifestyle95thBackDesign from "@/assets/lifestyle/lifestyle-95th-back-design.jpg";
import lifestyleQuarterzip from "@/assets/lifestyle/lifestyle-quarterzip.jpg";
import lifestyleAi95 from "@/assets/lifestyle/lifestyle-ai95.jpg";

// Polos
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";

// Headwear
import krimsonBucketFront from "@/assets/products/krimson-bucket-front.jpg";
import krimsonBucketBack from "@/assets/products/krimson-bucket-back.jpg";
import krimsonFittedBack from "@/assets/products/krimson-fitted-back.jpg";
import krimsonFittedFront1 from "@/assets/products/krimson-fitted-front-1.jpg";
import krimsonFittedSide2 from "@/assets/products/krimson-fitted-side-2.jpg";
import krimsonSkully from "@/assets/products/krimson-skully.jpg";
import flexKreamKap from "@/assets/products/flex-kream-kap.jpg";
import flexKreamKapBack from "@/assets/products/flex-kream-kap-back.jpg";
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";
import flexKrimsonKapBack from "@/assets/products/flex-krimson-kap-back.jpg";

// Registration-era tees
import kreamTee95thAnniversary from "@/assets/products/kream-tee-95th-anniversary.jpg";
import lifestyle95thAnniversary from "@/assets/lifestyle/lifestyle-95th-anniversary.jpg";
import krimsonTee95th from "@/assets/products/krimson-tee-95th.jpg";
import lifestyleKrimsonTee95th from "@/assets/lifestyle/lifestyle-krimson-tee-95th.jpg";

// Outerwear
import ktrZip from "@/assets/products/ktr-zip.jpg";

// Accessories
import kreamSocks from "@/assets/products/kream-socks.jpg";

// Current drop
import painFront from "@/assets/products/pain-front.jpg";
import painBack from "@/assets/products/pain-back.jpg";
import painModelFront from "@/assets/products/pain-model-front.jpg";
import painModelBack from "@/assets/products/pain-model-back.jpg";
import painVideoAsset from "@/assets/hero.mp4.asset.json";

export interface Product {
  id: string;
  image: string;
  images?: string[];
  /** Optional product video shown first in the gallery. */
  video?: string;
  name: string;
  price: string;
  category: string;
  soldOut?: boolean;
  description?: string;
  sizeType?: "apparel" | "fitted-hat" | "one-size";
  /** Hidden products stay in the catalog (past orders, easy re-launch) but are not listed anywhere on the storefront. */
  hidden?: boolean;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawProducts: Omit<Product, "id">[] = [
  // ===== CURRENT DROP =====
  {
    image: painModelFront,
    images: [painModelFront, painModelBack, painFront, painBack],
    video: painVideoAsset.url,
    name: "Pain of the Game · Tee",
    price: "$40.00",
    category: "Tees",
    sizeType: "apparel",
    description:
      "Vintage-wash heavyweight cotton tee. The front carries an x-ray study of the hand · five AI rings, every fracture, every strain, every ache earned along the way. The back runs the schedule: line after line, class after class, the ones who took the hits and kept moving.\n\nPain of the Game is not a slogan. It is the record.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Wash: Vintage / Garment Washed\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print: Front & full back panel",
  },

  // ===== ARCHIVED (hidden from storefront, kept for records) =====
  {
    hidden: true,
    soldOut: true,
    image: kreamTeeAchievers,
    images: [kreamTeeAchievers, lifestyleAchievers],
    name: '"Achievers" KREAM Tee',
    price: "$31.00",
    category: "Tees",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this tee delivers a structured yet comfortable fit with a substantial hand feel.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  {
    hidden: true,
    soldOut: true,
    image: kreamTeeCorner,
    images: [kreamTeeCorner, lifestyle95thFront, lifestyle95thBackDesign, kreamTee95thBack],
    name: '95th ANNIVERSARY "KREAM" Tee',
    price: "$31.00",
    category: "Tees",
    description:
      "Premium 300 GSM (8.8 oz) 100% cotton limited-edition tee.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  {
    hidden: true,
    soldOut: true,
    image: kreamTee1,
    images: [kreamTee1, lifestyleKdiamondFront2],
    name: "K-Diamond Outline Tee, Kream",
    price: "$31.00",
    category: "Tees",
    description:
      "Premium 300 GSM (8.8 oz) 100% cotton tee with a minimalist K-Diamond outline on the left chest.\n\n• Material: 100% Cotton\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck",
  },
  {
    hidden: true,
    soldOut: true,
    image: kreamTeeAi95,
    images: [kreamTeeAi95, lifestyleAi95],
    name: "AI 95th Large Logo Tee",
    price: "$31.00",
    category: "Tees",
    description:
      "Premium 300 GSM (8.8 oz) 100% cotton tee with the bold Alpha Iota 95th anniversary graphic across the chest.\n\n• Material: 100% Cotton\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck",
  },
  {
    hidden: true,
    soldOut: true,
    image: krimsonTee95th,
    images: [krimsonTee95th, lifestyleKrimsonTee95th],
    name: "KRIMSON 95th Anniversary Tee",
    price: "$31.00",
    category: "Tees",
    description:
      "Krimson tee with the 95th Anniversary crest in gold across the chest with laurel wreath detail.\n\n• Material: 100% Cotton\n• Fit: Relaxed / Standard",
  },
  {
    hidden: true,
    soldOut: true,
    image: kreamTee95thAnniversary,
    images: [kreamTee95thAnniversary, lifestyle95thAnniversary],
    name: "KREAM 95th Anniversary Tee",
    price: "$31.00",
    category: "Tees",
    description:
      "Registration-exclusive kream tee featuring the 95th Anniversary crest.\n\n• Material: 100% Cotton\n• Fit: Relaxed / Standard",
  },
  {
    hidden: true,
    soldOut: true,
    image: dryFitPolo,
    name: "KRIMSON Dry-Fit Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Lightweight moisture-wicking polo with 4-way stretch and anti-wrinkle construction.\n\n• Fabric Weight: 200 GSM\n• Logo: Embroidered Chest Logo",
  },
  {
    hidden: true,
    soldOut: true,
    image: kreamPerformancePolo,
    name: "KREAM Dry-Fit Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Lightweight kream moisture-wicking polo with 4-way stretch and anti-wrinkle construction.\n\n• Fabric Weight: 200 GSM\n• Logo: Embroidered Chest Logo",
  },
  {
    hidden: true,
    soldOut: true,
    image: krimsonFittedFront1,
    images: [krimsonFittedFront1, krimsonFittedSide2, krimsonFittedBack],
    name: "KRIMSON K-Diamond Fitted Hat",
    price: "$40.00",
    category: "Headwear",
    sizeType: "fitted-hat",
    description:
      "Classic fitted cap with raised 3D embroidery front and back plus a commemorative side patch.\n\n• Material: Premium Wool Blend\n• Fit: True Fitted Sizing",
  },
  {
    hidden: true,
    soldOut: true,
    image: krimsonBucketFront,
    images: [krimsonBucketFront, krimsonBucketBack],
    name: "KRIMSON K-Diamond Bucket Hat",
    price: "$24.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Padded canvas bucket hat with raised 3D embroidery.\n\n• Construction: Soft Structured\n• Brim: 360° Stitched",
  },
  {
    hidden: true,
    soldOut: true,
    image: krimsonSkully,
    name: "KRIMSON K-Diamond Skully",
    price: "$18.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Ribbed knit beanie in midweight acrylic with an embroidered diamond insignia.\n\n• Material: Acrylic Knit\n• Stretch: High",
  },
  {
    hidden: true,
    soldOut: true,
    image: flexKrimsonKap,
    images: [flexKrimsonKap, flexKrimsonKapBack],
    name: "KRIMSON FlexFit K-Diamond Kap",
    price: "$25.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Structured flex-fit cap with raised 3D embroidery front and back.\n\n• Material: Cotton Twill\n• Closure: Flex Fit",
  },
  {
    hidden: true,
    soldOut: true,
    image: flexKreamKap,
    images: [flexKreamKap, flexKreamKapBack],
    name: "KREAM 95th Anniversary Hat",
    price: "$25.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Registration-exclusive kream flex-fit cap with raised 3D embroidery.\n\n• Material: Cotton Twill\n• Closure: Flex Fit",
  },
  {
    hidden: true,
    soldOut: true,
    image: ktrZip,
    images: [ktrZip, lifestyleQuarterzip],
    name: "KRIMSON Quarter-Zip Sweater",
    price: "$50.00",
    category: "Outerwear",
    description:
      "Lightweight wool blend quarter-zip with embroidered chest insignia.\n\n• Fabric Weight: 200 GSM\n• Fit: Standard Tailored",
  },
  {
    hidden: true,
    soldOut: true,
    image: kreamSocks,
    name: "KREAM K-Diamond Socks",
    price: "$9.00",
    category: "Accessories",
    sizeType: "one-size",
    description:
      "Woven crew socks with reinforced heel and toe and an embroidered diamond patch.\n\n• Stretch: Moderate",
  },
];

/** Full catalog, including hidden/archived items (used for order history lookups). */
export const catalog: Product[] = rawProducts.map((p) => ({
  ...p,
  id: slugify(p.name),
}));

/** Products shown on the storefront. */
export const allProducts: Product[] = catalog.filter((p) => !p.hidden);

export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}

export const FEATURED_PRODUCT = allProducts[0];
