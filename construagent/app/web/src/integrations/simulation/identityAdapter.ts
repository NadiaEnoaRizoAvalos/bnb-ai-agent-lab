import type { AgentIdentityPort } from "../contracts";

const names: Record<string, string> = {
  construagent: "ConstruAgent",
  "proveedor-agent": "ProveedorAgent",
};

export const simulatedIdentityAdapter: AgentIdentityPort = {
  async resolve(localId) {
    return {
      localId,
      displayName: names[localId] ?? localId,
      verified: false,
      source: "simulation",
    };
  },
};

