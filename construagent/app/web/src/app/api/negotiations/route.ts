import { NextResponse } from "next/server";
import { createBudgets } from "@/features/budgets/budgetService";
import { validateBudgetRequest } from "@/features/budgets/validation";
import { getIntegrationPorts } from "@/integrations/container";
import type { NegotiationResult } from "@/types/domain";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const negotiation = getIntegrationPorts().negotiation;
  try {
    if (body.action === "request" && body.request && typeof body.supplierId === "string") {
      // El servidor reconstruye la cotización: nunca acepta precios calculados por el navegador.
      const budgetRequest = validateBudgetRequest({ ...(body.request as object), supplierId: body.supplierId });
      const [budget] = createBudgets(budgetRequest);
      return NextResponse.json({ negotiation: await negotiation.requestOffer(budget, budgetRequest.maxBudget), simulated: true });
    }
    if (body.action === "decide" && body.negotiation && typeof body.approved === "boolean") {
      return NextResponse.json({ negotiation: await negotiation.decide(body.negotiation as NegotiationResult, body.approved), simulated: true });
    }
    return NextResponse.json({ error: "Acción de negociación inválida." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la negociación simulada." }, { status: 400 });
  }
}
