import { describe, expect, it } from "vitest";
import { calculateBudget } from "@/features/budgets/budgetEngine";
import { suppliers } from "@/features/catalog/catalog";
import { validateBudgetRequest } from "@/features/budgets/validation";

describe("motor de presupuestos", () => {
  it("calcula el caso demostrativo de 4 × 3 m con cajas completas", () => {
    const result = calculateBudget({ width: 4, length: 3, wastePercent: 10, maxBudget: 150 }, suppliers[0]);
    expect(result.areaM2).toBe(12);
    expect(result.areaWithWasteM2).toBe(13.2);
    expect(result.lines.map((line) => line.quantity)).toEqual([7, 3, 1]);
    expect(result.total).toBe(159.5);
    expect(result.withinBudget).toBe(false);
  });

  it.each([
    [{ width: -1, length: 3 }, /ancho/i],
    [{ width: 0, length: 3 }, /ancho/i],
    [{ width: "x", length: 3 }, /número/i],
    [{ width: 3, length: null }, /número/i],
  ])("rechaza medidas inválidas", (input, message) => {
    expect(() => validateBudgetRequest(input)).toThrow(message);
  });

  it("informa falta de stock", () => {
    const result = calculateBudget({ width: 30, length: 30 }, suppliers[0]);
    expect(result.available).toBe(false);
    expect(result.warnings[0]).toMatch(/stock insuficiente/i);
  });

  it("redondea subtotales y total a centavos", () => {
    const result = calculateBudget({ width: 1, length: 1, wastePercent: 0 }, suppliers[1]);
    expect(result.total).toBe(30.9);
  });
});
