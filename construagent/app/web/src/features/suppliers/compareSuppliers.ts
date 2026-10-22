import type { BudgetResult, ComparisonResult } from "@/types/domain";

export function compareBudgets(budgets: BudgetResult[]): ComparisonResult {
  const options = [...budgets].sort((a, b) => a.total - b.total);
  const eligible = options.filter((item) => item.available && item.withinBudget !== false);
  const recommendation = eligible[0];

  if (!recommendation) {
    const stockProblem = options.every((item) => !item.available);
    return {
      options,
      recommendedSupplierId: null,
      explanation: stockProblem
        ? "Ningún proveedor posee stock suficiente para completar el pedido."
        : "Ninguna alternativa disponible respeta el presupuesto máximo indicado.",
    };
  }

  return {
    options,
    recommendedSupplierId: recommendation.supplierId,
    explanation: `${recommendation.supplierName} es la alternativa disponible de menor costo y respeta el límite indicado.`,
  };
}

