export type SpecialOrderPricingInput = {
  boxCount: number;
  boxCapacityGrams: number;
  gramsPerBox: number;
  basePricePerBox: number;
  packagingPerBox: number;
  customizationCharge: number;
};

export function calculateSpecialOrder(input: SpecialOrderPricingInput) {
  const subtotal = input.boxCount * input.basePricePerBox;
  const packagingCharge = input.boxCount * input.packagingPerBox;
  const total = subtotal + packagingCharge + input.customizationCharge;
  return {
    totalKg: (input.boxCount * input.gramsPerBox) / 1000,
    capacityPercent: Math.round((input.gramsPerBox / input.boxCapacityGrams) * 100),
    subtotal,
    packagingCharge,
    customizationCharge: input.customizationCharge,
    total,
    advance: Math.round(total / 2),
    balance: total - Math.round(total / 2),
  };
}

export type ProductionRequirement = { sweet: string; kilograms: number };

export function aggregateProduction(requirements: ProductionRequirement[]) {
  return requirements.reduce<Record<string, number>>((totals, requirement) => {
    totals[requirement.sweet] = (totals[requirement.sweet] ?? 0) + requirement.kilograms;
    return totals;
  }, {});
}
