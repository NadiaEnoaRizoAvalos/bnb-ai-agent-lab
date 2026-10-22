import { describe, expect, it } from "vitest";
import { createBudgets } from "@/features/budgets/budgetService";
import { getIntegrationPorts } from "@/integrations/container";

describe("puertos de integración en modo simulado", () => {
  const ports = getIntegrationPorts();

  it("no expone ninguna capacidad ejecutable", () => {
    expect(ports.mode).toBe("simulation");
    expect(ports.capabilities.every((capability) => !capability.executable)).toBe(true);
    expect(ports.capabilities.find((item) => item.name === "chain_reads")?.state).toBe("not_configured");
  });

  it("resuelve identidades locales sin afirmar verificación externa", async () => {
    await expect(ports.identity.resolve("construagent")).resolves.toEqual({
      localId: "construagent",
      displayName: "ConstruAgent",
      verified: false,
      source: "simulation",
    });
  });

  it("reutiliza el catálogo local detrás de su puerto", async () => {
    await expect(ports.catalog.listSupplierIds()).resolves.toEqual(["obra-norte", "casa-sur"]);
  });

  it("prepara acuerdos no ejecutables y siempre exige aprobación", async () => {
    const budget = createBudgets({ width: 4, length: 3 })[0];
    const negotiation = await ports.negotiation.requestOffer(budget, 200);
    const preview = await ports.agreements.prepare(negotiation);
    expect(preview.executable).toBe(false);
    expect(preview.requiresHumanApproval).toBe(true);
    expect(preview.reference).toMatch(/^SIM-AGREEMENT-/);
  });

  it("solo crea una vista previa de pago luego de una aprobación simulada", async () => {
    const budget = createBudgets({ width: 4, length: 3 })[0];
    const offer = await ports.negotiation.requestOffer(budget, 200);
    await expect(ports.payments.preview(offer)).rejects.toThrow(/aprobada/i);
    const approved = await ports.negotiation.decide(offer, true);
    const preview = await ports.payments.preview(approved);
    expect(preview).toMatchObject({ executable: false, amount: approved.offeredTotal, assetLabel: "U" });
  });
});
