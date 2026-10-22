import { decideOffer, requestOffer } from "@/features/negotiation/negotiationEngine";
import type { NegotiationPort } from "../contracts";

export const simulatedNegotiationAdapter: NegotiationPort = {
  async requestOffer(budget, maxBudget) {
    return requestOffer(budget, maxBudget);
  },
  async decide(negotiation, approved) {
    return decideOffer(negotiation, approved);
  },
};

