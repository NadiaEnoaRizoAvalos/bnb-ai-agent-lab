import { calculateBudget } from "./budgetEngine";
import { getSupplier, suppliers } from "@/features/catalog/catalog";
import type { BudgetRequest, BudgetResult } from "@/types/domain";

export function createBudgets(request: BudgetRequest): BudgetResult[] {
  if (request.supplierId) {
    const supplier = getSupplier(request.supplierId);
    if (!supplier) throw new Error("El proveedor seleccionado no existe.");
    return [calculateBudget(request, supplier)];
  }
  return suppliers.map((supplier) => calculateBudget(request, supplier));
}

