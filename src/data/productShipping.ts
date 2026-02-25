// Weight (lbs) and package dimensions (inches) per product category for Shippo API
export interface ShippingSpec {
  weight: number; // lbs
  length: number;
  width: number;
  height: number;
}

const categorySpecs: Record<string, ShippingSpec> = {
  Accessories: { weight: 0.5, length: 6, width: 4, height: 2 },
  Headwear: { weight: 1, length: 12, width: 10, height: 6 },
  Tees: { weight: 1.5, length: 12, width: 9, height: 2 },
  Polos: { weight: 1.5, length: 12, width: 9, height: 2 },
  Outerwear: { weight: 3, length: 16, width: 12, height: 4 },
};

export function getShippingSpec(category: string): ShippingSpec {
  return categorySpecs[category] || categorySpecs.Tees; // default to tee specs
}

/**
 * Given a list of items with category + quantity, compute total weight
 * and use the largest dimensions in the cart.
 */
export function computePackage(
  items: { category: string; quantity: number }[]
): ShippingSpec {
  let totalWeight = 0;
  let maxLength = 0;
  let maxWidth = 0;
  let maxHeight = 0;

  for (const item of items) {
    const spec = getShippingSpec(item.category);
    totalWeight += spec.weight * item.quantity;
    maxLength = Math.max(maxLength, spec.length);
    maxWidth = Math.max(maxWidth, spec.width);
    maxHeight = Math.max(maxHeight, spec.height);
  }

  return {
    weight: totalWeight,
    length: maxLength,
    width: maxWidth,
    height: maxHeight,
  };
}
