import { NextResponse } from "next/server";
import { createBudgets } from "@/features/budgets/budgetService";
import { BudgetValidationError, validateBudgetRequest } from "@/features/budgets/validation";
import { compareBudgets } from "@/features/suppliers/compareSuppliers";

export async function POST(request: Request) {
  try {
    const input = validateBudgetRequest(await request.json());
    const budgets = createBudgets(input);
    return NextResponse.json({ budgets, comparison: compareBudgets(budgets), simulated: true });
  } catch (error) {
    if (error instanceof BudgetValidationError) {
      return NextResponse.json({ error: error.message, details: error.details }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "No se pudo generar el presupuesto.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
