import type { IntegrationPorts } from "./contracts";
import { simulatedAgreementAdapter } from "./simulation/agreementAdapter";
import { simulatedCatalogAdapter } from "./simulation/catalogAdapter";
import { simulatedChainReadAdapter } from "./simulation/chainReadAdapter";
import { simulatedIdentityAdapter } from "./simulation/identityAdapter";
import { simulatedNegotiationAdapter } from "./simulation/negotiationAdapter";
import { simulatedPaymentAdapter } from "./simulation/paymentAdapter";
import { getIntegrationMode } from "./runtimeConfig";

/**
 * Único punto de composición. La fase preparatoria no permite seleccionar un
 * adaptador externo mediante variables de entorno o datos del navegador.
 */
export function getIntegrationPorts(): IntegrationPorts {
  const mode = getIntegrationMode();
  return {
    mode,
    capabilities: [
      { name: "catalog", state: "simulated", executable: false },
      { name: "identity", state: "simulated", executable: false },
      { name: "negotiation", state: "simulated", executable: false },
      { name: "escrow", state: "simulated", executable: false },
      { name: "payment", state: "simulated", executable: false },
      { name: "chain_reads", state: "not_configured", executable: false },
    ],
    catalog: simulatedCatalogAdapter,
    identity: simulatedIdentityAdapter,
    negotiation: simulatedNegotiationAdapter,
    agreements: simulatedAgreementAdapter,
    payments: simulatedPaymentAdapter,
    chainReads: simulatedChainReadAdapter,
  };
}
