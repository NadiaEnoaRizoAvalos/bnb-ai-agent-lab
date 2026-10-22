import type { AgreementPort } from "../contracts";

export const simulatedAgreementAdapter: AgreementPort = {
  async prepare(negotiation) {
    return {
      reference: `SIM-AGREEMENT-${negotiation.id}`,
      negotiationId: negotiation.id,
      executable: false,
      requiresHumanApproval: true,
      notice: "Vista previa local: no crea contratos, escrow ni transacciones.",
    };
  },
};

