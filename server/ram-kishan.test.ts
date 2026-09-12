import { describe, expect, it } from "vitest";
import { aggregateProduction, calculateSpecialOrder } from "../shared/ram-kishan";

describe("RAM KISHAN order planning", () => {
  it("calculates the 100-box 500g special order summary", () => {
    const result = calculateSpecialOrder({
      boxCount: 100,
      boxCapacityGrams: 500,
      gramsPerBox: 500,
      basePricePerBox: 825,
      packagingPerBox: 65,
      customizationCharge: 2400,
    });

    expect(result.totalKg).toBe(50);
    expect(result.subtotal).toBe(82500);
    expect(result.packagingCharge).toBe(6500);
    expect(result.total).toBe(91400);
    expect(result.advance).toBe(45700);
    expect(result.balance).toBe(45700);
  });

  it("aggregates repeated sweet requirements into the kitchen plan", () => {
    expect(
      aggregateProduction([
        { sweet: "Kaju Katli", kilograms: 20 },
        { sweet: "Motichoor Laddu", kilograms: 15 },
        { sweet: "Kaju Katli", kilograms: 22 },
      ]),
    ).toEqual({ "Kaju Katli": 42, "Motichoor Laddu": 15 });
  });
});
