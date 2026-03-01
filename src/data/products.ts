// Tees
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee95thBack from "@/assets/products/kream-tee-95th-back.jpg";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";

// Lifestyle shots
import lifestyleAchievers from "@/assets/lifestyle/lifestyle-achievers.jpg";
import lifestyleKdiamondFront1 from "@/assets/lifestyle/lifestyle-kdiamond-front-1.jpg";
import lifestyleKdiamondFront2 from "@/assets/lifestyle/lifestyle-kdiamond-front-2.jpg";
import lifestyleKdiamondChest from "@/assets/lifestyle/lifestyle-kdiamond-chest.jpg";
import lifestyle95thBack from "@/assets/lifestyle/lifestyle-95th-back.jpg";
import lifestyle95thFront from "@/assets/lifestyle/lifestyle-95th-front.jpg";
import lifestyle95thBackDesign from "@/assets/lifestyle/lifestyle-95th-back-design.jpg";
import lifestyleQuarterzip from "@/assets/lifestyle/lifestyle-quarterzip.jpg";
import lifestyleAi95 from "@/assets/lifestyle/lifestyle-ai95.jpg";

// Polos
import dryFitPolo from "@/assets/products/dry-fit-polo.jpg";
import kreamPerformancePolo from "@/assets/products/kream-performance-polo.jpg";
import krimsonWovenPolo from "@/assets/products/krimson-woven-polo.jpg";

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

// Registration-only tees
import kreamTee95thAnniversary from "@/assets/products/kream-tee-95th-anniversary.jpg";
import lifestyle95thAnniversary from "@/assets/lifestyle/lifestyle-95th-anniversary.jpg";
import krimsonTee95th from "@/assets/products/krimson-tee-95th.jpg";
import lifestyleKrimsonTee95th from "@/assets/lifestyle/lifestyle-krimson-tee-95th.jpg";

// Outerwear
import ktrZip from "@/assets/products/ktr-zip.jpg";

// Accessories
import kreamSocks from "@/assets/products/kream-socks.jpg";

export interface Product {
  id: string;
  image: string;
  images?: string[];
  name: string;
  price: string;
  category: string;
  soldOut?: boolean;
  description?: string;
  sizeType?: "apparel" | "fitted-hat" | "one-size";
  registrationOnly?: boolean;
  registrationNote?: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawProducts: Omit<Product, "id">[] = [
  // Tees
  {
    image: kreamTeeAchievers,
    images: [kreamTeeAchievers, lifestyleAchievers],
    name: '"Achievers" KREAM Tee',
    price: "$31.00",
    category: "Tees",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this tee delivers a structured yet comfortable fit with a substantial hand feel. Designed to commemorate 95 years of legacy, achievement, and brotherhood, the \"Achievers of the Impossible\" graphic is intentionally placed to honor Alpha Iota's historic impact.\n\nModerate thickness and breathability make it ideal for year-round wear — whether layered or worn as a standalone statement piece.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  {
    image: kreamTeeCorner,
    images: [kreamTeeCorner, lifestyle95thFront, lifestyle95thBackDesign, kreamTee95thBack],
    name: '95th ANNIVERSARY "KREAM" Tee',
    price: "$31.00",
    category: "Tees",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this limited-edition tee celebrates 95 years of Alpha Iota, 1931–2026. Front features the commemorative crest in krimson on a kream base with a bold anniversary graphic spanning the full back panel.\n\nModerate thickness and breathability make it ideal for year-round wear — whether layered or worn as a standalone statement piece.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  {
    image: kreamTee1,
    images: [kreamTee1, lifestyleKdiamondFront2],
    name: "K-Diamond Outline Tee, Kream",
    price: "$31.00",
    category: "Tees",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this tee features a minimalist K-Diamond outline on the left chest. Designed to commemorate 95 years of legacy, achievement, and brotherhood.\n\nModerate thickness and breathability make it ideal for year-round wear — whether layered or worn as a standalone statement piece.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  {
    image: kreamTeeAi95,
    images: [kreamTeeAi95, lifestyleAi95],
    name: "AI 95th Large Logo Tee",
    price: "$31.00",
    category: "Tees",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this tee features the bold Alpha Iota 95th anniversary graphic across the chest. Designed to commemorate 95 years of legacy, achievement, and brotherhood.\n\nModerate thickness and breathability make it ideal for year-round wear — whether layered or worn as a standalone statement piece.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  {
    image: krimsonTee95th,
    images: [krimsonTee95th, lifestyleKrimsonTee95th],
    name: "KRIMSON 95th Anniversary Tee",
    price: "$31.00",
    category: "Tees",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this krimson tee features the 95th Anniversary crest in gold across the chest with laurel wreath detail. Designed to commemorate 95 years of legacy, achievement, and brotherhood.\n\nModerate thickness and breathability make it ideal for year-round wear — whether layered or worn as a standalone statement piece.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  // Polos (dry-fit only)
  {
    image: dryFitPolo,
    name: "KRIMSON Dry-Fit Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Engineered for movement and performance, this lightweight polo features moisture-wicking fabric with 4-way stretch for enhanced comfort. Anti-wrinkle construction maintains a clean, structured look throughout wear.\n\nDesigned for active events, golf outings, and outdoor gatherings.\n\n• Material: Polyester / Cotton / Spandex Blend\n• Fabric Weight: 200 GSM\n• Breathability: High\n• Stretch: 4-Way Stretch\n• Finish: Anti-Wrinkle / Moisture-Wicking\n• Logo: Embroidered Chest Logo",
  },
  {
    image: kreamPerformancePolo,
    name: "KREAM Dry-Fit Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Engineered for movement and performance, this lightweight kream polo features moisture-wicking fabric with 4-way stretch for enhanced comfort. Anti-wrinkle construction maintains a clean, structured look throughout wear.\n\nDesigned for active events, golf outings, and outdoor gatherings.\n\n• Material: Polyester / Cotton / Spandex Blend\n• Fabric Weight: 200 GSM\n• Breathability: High\n• Stretch: 4-Way Stretch\n• Finish: Anti-Wrinkle / Moisture-Wicking\n• Logo: Embroidered Chest Logo",
  },
  // Headwear
  {
    image: krimsonFittedFront1,
    images: [krimsonFittedFront1, krimsonFittedSide2, krimsonFittedBack],
    name: "KRIMSON K-Diamond Fitted Hat",
    price: "$40.00",
    category: "Headwear",
    sizeType: "fitted-hat",
    description:
      "A true heritage silhouette. This classic fitted cap features authentic raised 3D embroidery on the front and back with a commemorative 95th anniversary side patch. Structured construction and precise sizing provide a premium, tailored fit that honors tradition.\n\n• Material: Premium Wool Blend\n• Crown: High-Profile Structured\n• Fit: True Fitted Sizing\n• Embroidery: Raised 3D (Front & Back)\n• Side Detail: 95th Anniversary Patch\n• Visor: Flat Bill (Can Be Curved)\n• Interior: Taped Seams / Moisture-Wicking Sweatband",
  },
  {
    image: krimsonBucketFront,
    images: [krimsonBucketFront, krimsonBucketBack],
    name: "KRIMSON K-Diamond Bucket Hat",
    price: "$24.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Constructed from durable padded canvas, this bucket hat maintains structure while remaining lightweight and comfortable. Raised 3D embroidery provides bold dimension, blending modern streetwear styling with commemorative heritage design.\n\n• Material: Padded Cotton Canvas\n• Construction: Soft Structured\n• Embroidery: Raised 3D\n• Brim: 360° Stitched Brim\n• Fit: Standard Adjustable Interior",
  },
  {
    image: krimsonSkully,
    name: "KRIMSON K-Diamond Skully",
    price: "$18.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "A classic ribbed knit beanie designed for warmth and comfort. Midweight acrylic construction provides insulation without bulk, while the embroidered diamond insignia adds refined detail. Ideal for cooler seasons and transitional weather.\n\n• Material: Acrylic Knit\n• Weight: Midweight\n• Stretch: High Stretch\n• Embroidery: Flat Embroidered Diamond Logo\n• Construction: Ribbed Knit",
  },
  {
    image: flexKrimsonKap,
    images: [flexKrimsonKap, flexKrimsonKapBack],
    name: "KRIMSON FlexFit K-Diamond Kap",
    price: "$25.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Built on a structured flex-fit silhouette, this cap features raised 3D embroidery on the front and back for bold dimensional impact. The structured crown maintains shape while the elasticized interior band ensures a comfortable, secure fit.\n\nDesigned for everyday wear while maintaining commemorative presence.\n\n• Material: Cotton Twill (Structured)\n• Crown: 6-Panel Structured\n• Closure: Flex Fit (Elasticized Interior Band)\n• Embroidery: Raised 3D (Front & Back)\n• Visor: Pre-Curved\n• Sweatband: Moisture-Wicking Cotton Blend",
  },
  // Kream Hat — Registration Exclusive
  {
    image: flexKreamKap,
    images: [flexKreamKap, flexKreamKapBack],
    name: "KREAM 95th Anniversary Hat",
    price: "$0.00",
    category: "Headwear",
    sizeType: "one-size",
    registrationOnly: true,
    registrationNote:
      "This item is exclusively available to brothers who have officially registered for the Alpha Iota 95th Anniversary Celebration.\n\nThe kream commemorative hat is not available for direct purchase through this site.\n\nTo secure this item, you must complete your official 95th Anniversary registration.",
    description:
      "Built on a structured flex-fit silhouette, this registration-exclusive kream cap features raised 3D embroidery for bold dimensional impact. Available only to registered attendees of the Alpha Iota 95th Anniversary Celebration.\n\n• Material: Cotton Twill (Structured)\n• Crown: 6-Panel Structured\n• Closure: Flex Fit (Elasticized Interior Band)\n• Embroidery: Raised 3D (Front & Back)\n• Visor: Pre-Curved",
  },
  // Registration-only Tee
  {
    image: kreamTee95thAnniversary,
    images: [kreamTee95thAnniversary, lifestyle95thAnniversary],
    name: "KREAM 95th Anniversary Tee",
    price: "$0.00",
    category: "Tees",
    registrationOnly: true,
    registrationNote:
      "This item is exclusively available to brothers who have officially registered for the Alpha Iota 95th Anniversary Celebration.\n\nThe kream commemorative tee is not available for direct purchase through this site.\n\nTo secure this item, you must complete your official 95th Anniversary registration.",
    description:
      "Crafted from premium 300 GSM (8.8 oz) 100% cotton, this registration-exclusive kream tee features the 95th Anniversary crest. Available only to registered attendees of the Alpha Iota 95th Anniversary Celebration.\n\n• Material: 100% Cotton\n• Fabric Weight: 300 GSM (8.8 oz)\n• Fit: Relaxed / Standard\n• Collar: Ribbed Crewneck\n• Print Method: High-density screen print",
  },
  // Outerwear
  {
    image: ktrZip,
    images: [ktrZip, lifestyleQuarterzip],
    name: "KRIMSON Quarter-Zip Sweater",
    price: "$50.00",
    category: "Outerwear",
    description:
      "A refined layering essential crafted from a lightweight wool blend. The quarter-zip neckline allows versatile styling, while the embroidered chest insignia delivers subtle commemorative detailing.\n\nIdeal for transitional seasons and elevated casual settings.\n\n• Material: Wool Blend (Wool / Polyester)\n• Fabric Weight: 200 GSM\n• Thickness: Lightweight to Moderate\n• Breathability: Moderate\n• Closure: Metal Quarter Zip\n• Logo: Embroidered Chest Logo\n• Fit: Standard Tailored Fit",
  },
  // Accessories
  {
    image: kreamSocks,
    name: "KREAM K-Diamond Socks",
    price: "$9.00",
    category: "Accessories",
    sizeType: "one-size",
    description:
      "Crafted for comfort and durability, these woven crew socks feature reinforced heel and toe construction with applied embroidered diamond detailing. Designed for everyday wear while maintaining symbolic presence. 3 for $20.\n\n• Material: Cotton / Polyester / Spandex Blend\n• Construction: Woven Crew Sock\n• Logo: Embroidered Diamond Patch\n• Stretch: Moderate\n• Cushioning: Reinforced Heel & Toe",
  },
];

export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  id: slugify(p.name),
}));

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export const REGISTRATION_URL = "https://alphaiota95.com/";
