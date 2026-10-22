import { describe, expect, it } from "vitest";
import { createBudgets } from "@/features/budgets/budgetService";
import { decideOffer, requestOffer } from "@/features/negotiation/negotiationEngine";

describe("negociación simulada", () => {
  const budget = createBudgets({ width: 4, length: 3 })[1];

  it("solicita autorización si la oferta cumple las reglas", () => {
    expect(requestOffer(budget, 200).status).toBe("requiere_aprobacion");
  });

  it("rechaza si excede el techo de gasto", () => {
    expect(requestOffer(budget, 80).status).toBe("rechazada");
  });

  it("genera una sola orden al aprobar y evita duplicados", () => {
    const first = decideOffer(requestOffer(budget, 200), true);
    const repeated = decideOffer(first, true);
    expect(first.status).toBe("confirmada");
    expect(repeated).toEqual(first);
    expect(first.orderId).toMatch(/^ORD-/);
  });
});
