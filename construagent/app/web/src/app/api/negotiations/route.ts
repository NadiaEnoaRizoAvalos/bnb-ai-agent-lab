import { NextResponse } from "next/server";
import { decideOffer, requestOffer } from "@/features/negotiation/negotiationEngine";
import type { BudgetResult, NegotiationResult } from "@/types/domain";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  try {
    if (body.action === "request" && body.budget) {
      return NextResponse.json({ negotiation: requestOffer(body.budget as BudgetResult, optionalNumber(body.maxBudget)), simulated: true });
    }
    if (body.action === "decide" && body.negotiation && typeof body.approved === "boolean") {
      return NextResponse.json({ negotiation: decideOffer(body.negotiation as NegotiationResult, body.approved), simulated: true });
    }
    return NextResponse.json({ error: "Acción de negociación inválida." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la negociación simulada." }, { status: 400 });
  }
}

function optionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

