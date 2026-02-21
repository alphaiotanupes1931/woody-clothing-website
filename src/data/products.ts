// Tees
import kreamTeeAchievers from "@/assets/products/kream-tee-achievers.jpg";
import tee95thFront from "@/assets/products/tee-95th-front.jpg";
import tee95thBack from "@/assets/products/tee-95th-back.jpg";
import kreamTeeCorner from "@/assets/products/kream-tee-corner.png";
import kreamTee1 from "@/assets/products/kream-tee-1.jpg";
import kreamTee2 from "@/assets/products/kream-tee-2.jpg";
import kreamTeeAi95 from "@/assets/products/kream-tee-ai95.jpg";

// Lifestyle shots
import lifestyleAchievers from "@/assets/lifestyle/lifestyle-achievers.jpg";
import lifestyleKdiamondFront1 from "@/assets/lifestyle/lifestyle-kdiamond-front-1.jpg";
import lifestyleKdiamondFront2 from "@/assets/lifestyle/lifestyle-kdiamond-front-2.jpg";
import lifestyleKdiamondChest from "@/assets/lifestyle/lifestyle-kdiamond-chest.jpg";
import lifestyle95thBack from "@/assets/lifestyle/lifestyle-95th-back.jpg";
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
import flexKrimsonKap from "@/assets/products/flex-krimson-kap.jpg";

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
      "Heavyweight 6.5 oz cotton tee featuring the iconic \"Achievers of the Impossible\" graphic across the back. Relaxed boxy fit with ribbed crew neck. Pre-shrunk and garment-dyed in kream for a lived-in feel from day one.",
  },
  {
    image: kreamTeeCorner,
    images: [kreamTeeCorner, tee95thBack, lifestyle95thBack],
    name: '95th ANNIVERSARY "KREAM" Tee',
    price: "$31.00",
    category: "Tees",
    description:
      "Limited-edition tee celebrating 95 years of Alpha Iota, 1931–2026. Front features the commemorative crest in krimson on a kream base. Bold anniversary graphic spanning the full back panel. Heavyweight 7 oz cotton, boxy cut, screen-printed with water-based inks for a soft hand feel.",
  },
  {
    image: kreamTee1,
    images: [kreamTee1, lifestyleKdiamondFront1, lifestyleKdiamondFront2, lifestyleKdiamondChest],
    name: "K-Diamond Outline Tee, Kream",
    price: "$31.00",
    category: "Tees",
    description:
      "Minimalist take on the K-Diamond logo with a clean outline print on the left chest. 100% ring-spun cotton in kream. Relaxed fit with a slightly longer body for easy layering under flannels or jackets.",
  },
  {
    image: kreamTeeAi95,
    images: [kreamTeeAi95, lifestyleAi95],
    name: "AI 95th Large Logo Tee",
    price: "$31.00",
    category: "Tees",
    description:
      "Kream heavyweight tee featuring the bold Alpha Iota 95th anniversary graphic across the chest. \"Not Your Typical Nupes\" silhouette design with the iconic tree and chapter crest. 6.5 oz ring-spun cotton, boxy relaxed fit, screen-printed with water-based inks.",
  },
  // Polos (dry-fit only)
  {
    image: dryFitPolo,
    name: "KRIMSON Dry-Fit Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Lightweight dry-fit polo in krimson with breathable mesh side panels. Anti-odor technology and quick-dry fabric keep you fresh through long days. K-Diamond embroidery on the chest. Athletic fit with ribbed sleeve cuffs.",
  },
  {
    image: kreamPerformancePolo,
    name: "KREAM Dry-Fit Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Built for movement. Moisture-wicking dry-fit fabric in kream with four-way stretch and UPF 30 sun protection. K-Diamond logo heat-pressed on the chest. Ideal for the golf course, cookouts, or anytime you need to look polished while staying cool.",
  },
  {
    image: krimsonWovenPolo,
    name: "KRIMSON Woven Polo",
    price: "$45.00",
    category: "Polos",
    description:
      "Classic woven polo in krimson with the K-Diamond crest embroidered on the left chest. Textured piqué cotton blend for breathability and structure. Three-button placket, ribbed collar, and side vents for a refined, comfortable fit.",
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
      "Structured six-panel fitted cap in krimson with the K-Diamond patch front and center. Premium wool blend, embroidered eyelets, and a satin-lined interior. Flat brim with a green undervisor for that classic look.",
  },
  {
    image: krimsonBucketFront,
    images: [krimsonBucketFront, krimsonBucketBack],
    name: "KRIMSON K-Diamond Bucket Hat",
    price: "$24.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Casual bucket hat in krimson with the K-Diamond patch on the front panel. Soft cotton twill construction with a short, downturned brim for sun coverage. Metal eyelets for ventilation. One size fits most with a comfortable interior sweatband.",
  },
  {
    image: krimsonSkully,
    name: "KRIMSON K-Diamond Skully",
    price: "$18.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "Ribbed-knit skully beanie in krimson with the K-Diamond logo embroidered at the cuff. Soft acrylic blend that stretches to fit. Fold the cuff up or pull it down for a slouch fit. Essential cold-weather gear.",
  },
  {
    image: flexKrimsonKap,
    name: "KRIMSON FlexFit K-Diamond Kap",
    price: "$25.00",
    category: "Headwear",
    sizeType: "one-size",
    description:
      "FlexFit stretch-fit cap in krimson with kream K-Diamond patch. Comfortable stretch-band construction. Mid-profile crown with a pre-curved brim. Easy to wear, hard to take off.",
  },
  // Kream Hat — Registration Exclusive
  {
    image: flexKreamKap,
    name: "KREAM 95th Anniversary Hat",
    price: "$0.00",
    category: "Headwear",
    sizeType: "one-size",
    registrationOnly: true,
    registrationNote:
      "This item is exclusively available to brothers who have officially registered for the Alpha Iota 95th Anniversary Celebration.\n\nThe kream commemorative hat is not available for direct purchase through this site.\n\nTo secure this item, you must complete your official 95th Anniversary registration.",
    description:
      "Registration-exclusive commemorative hat in kream with the K-Diamond patch. Available only to registered attendees of the Alpha Iota 95th Anniversary Celebration.",
  },
  // Outerwear
  {
    image: ktrZip,
    images: [ktrZip, lifestyleQuarterzip],
    name: "KRIMSON Quarter-Zip Sweater",
    price: "$50.00",
    category: "Outerwear",
    description:
      "Polished quarter-zip pullover in krimson with the K-Diamond logo embroidered at the left chest. Soft-brushed fleece interior for warmth without bulk. Stand-up collar, ribbed cuffs, and a straight hem. Layer it over a polo or tee for chapter events, travel, or everyday wear.",
  },
  // Accessories
  {
    image: kreamSocks,
    name: "KREAM K-Diamond Socks",
    price: "$9.00",
    category: "Accessories",
    sizeType: "one-size",
    description:
      "Crew-length socks in kream with the K-Diamond logo knitted at the calf. Cushioned sole, reinforced heel and toe, and a ribbed cuff that stays up all day. Fits sizes 8–13. The finishing touch to any fit. 3 for $20.",
  },
];

export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  id: slugify(p.name),
}));

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export const REGISTRATION_URL = "#register"; // placeholder until registration site is created
