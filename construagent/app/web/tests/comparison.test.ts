import { describe, expect, it } from "vitest";
import { compareBudgets } from "@/features/suppliers/compareSuppliers";
import { createBudgets } from "@/features/budgets/budgetService";

describe("comparador de proveedores", () => {
  it("recomienda la alternativa disponible más económica", () => {
    const result = compareBudgets(createBudgets({ width: 4, length: 3, maxBudget: 200 }));
    expect(result.recommendedSupplierId).toBe("casa-sur");
    expect(result.options[0].total).toBeLessThan(result.options[1].total);
  });

  it("no recomienda si todas superan el presupuesto", () => {
    const result = compareBudgets(createBudgets({ width: 4, length: 3, maxBudget: 80 }));
    expect(result.recommendedSupplierId).toBeNull();
    expect(result.explanation).toMatch(/ninguna/i);
  });
});

