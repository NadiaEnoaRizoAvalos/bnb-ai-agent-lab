import type { ChainReadPort } from "../contracts";

export const simulatedChainReadAdapter: ChainReadPort = {
  async observe(reference) {
    return {
      reference,
      state: "not_configured",
      verified: false,
      notice: "No se realizó una lectura de blockchain.",
    };
  },
};

