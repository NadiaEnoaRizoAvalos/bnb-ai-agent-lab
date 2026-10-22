import type { BudgetResult, NegotiationResult } from "@/types/domain";

const discount = (value: number) => Math.round(value * 0.97 * 100) / 100;

export function requestOffer(budget: BudgetResult, maxBudget?: number): NegotiationResult {
  const offeredTotal = discount(budget.total);
  const affordable = maxBudget === undefined || offeredTotal <= maxBudget;
  const available = budget.available;
  const accepted = affordable && available;
  const id = `NEG-${budget.supplierId}-${budget.areaM2}`.toUpperCase();

  return {
    id,
    supplierName: budget.supplierName,
    originalTotal: budget.total,
    offeredTotal,
    status: accepted ? "requiere_aprobacion" : "rechazada",
    reason: !available
      ? "La oferta se rechaza por stock insuficiente."
      : !affordable
        ? "La oferta supera el presupuesto máximo incluso con el descuento simulado."
        : "La oferta tiene stock, respeta el presupuesto y requiere autorización del cliente.",
    messages: [
      { agent: "ConstruAgent", text: `Solicito una oferta por los materiales calculados (${budget.areaWithWasteM2} m² con desperdicio).` },
      { agent: "ProveedorAgent", text: `Propongo un total simulado de ${offeredTotal.toFixed(2)} U, sujeto a aprobación del cliente.` },
    ],
  };
}

export function decideOffer(negotiation: NegotiationResult, approved: boolean): NegotiationResult {
  if (negotiation.status === "confirmada" || negotiation.status === "rechazada") return negotiation;
  if (!approved) {
    return { ...negotiation, status: "rechazada", reason: "El cliente rechazó la oferta simulada.", messages: [...negotiation.messages, { agent: "ConstruAgent", text: "El cliente no autorizó la propuesta." }] };
  }
  return {
    ...negotiation,
    status: "confirmada",
    reason: "El cliente aprobó la simulación. No se realizó ningún pago ni transacción.",
    orderId: `ORD-${negotiation.id}`,
    messages: [...negotiation.messages, { agent: "ConstruAgent", text: "El cliente autorizó la orden simulada." }, { agent: "ProveedorAgent", text: "Confirmación digital simulada emitida. Sin operación blockchain." }],
  };
}

