import type { PaymentPort } from "../contracts";

export const simulatedPaymentAdapter: PaymentPort = {
  async preview(negotiation) {
    if (!negotiation.orderId) throw new Error("La oferta debe estar aprobada antes de preparar un pago simulado.");
    return {
      reference: `SIM-PAYMENT-${negotiation.orderId}`,
      orderId: negotiation.orderId,
      amount: negotiation.offeredTotal,
      assetLabel: "U",
      executable: false,
      notice: "Vista previa local: no solicita credenciales ni transfiere activos.",
    };
  },
};

