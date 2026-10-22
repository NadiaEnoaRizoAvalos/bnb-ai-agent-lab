import type { BudgetResult, NegotiationResult } from "@/types/domain";

export type IntegrationMode = "simulation";
export type CapabilityState = "simulated" | "not_configured";

export interface IntegrationCapability {
  name: "catalog" | "identity" | "negotiation" | "escrow" | "payment" | "chain_reads";
  state: CapabilityState;
  executable: boolean;
}

export interface AgentIdentity {
  localId: string;
  displayName: string;
  verified: boolean;
  source: IntegrationMode;
}

export interface AgreementPreview {
  reference: string;
  negotiationId: string;
  executable: false;
  requiresHumanApproval: true;
  notice: string;
}

export interface PaymentPreview {
  reference: string;
  orderId: string;
  amount: number;
  assetLabel: "U";
  executable: false;
  notice: string;
}

export interface ChainObservation {
  reference: string;
  state: "not_configured";
  verified: false;
  notice: string;
}

export interface CatalogPort {
  listSupplierIds(): Promise<string[]>;
}

export interface AgentIdentityPort {
  resolve(localId: string): Promise<AgentIdentity>;
}

export interface NegotiationPort {
  requestOffer(budget: BudgetResult, maxBudget?: number): Promise<NegotiationResult>;
  decide(negotiation: NegotiationResult, approved: boolean): Promise<NegotiationResult>;
}

export interface AgreementPort {
  prepare(negotiation: NegotiationResult): Promise<AgreementPreview>;
}

export interface PaymentPort {
  preview(negotiation: NegotiationResult): Promise<PaymentPreview>;
}

export interface ChainReadPort {
  observe(reference: string): Promise<ChainObservation>;
}

export interface IntegrationPorts {
  mode: IntegrationMode;
  capabilities: IntegrationCapability[];
  catalog: CatalogPort;
  identity: AgentIdentityPort;
  negotiation: NegotiationPort;
  agreements: AgreementPort;
  payments: PaymentPort;
  chainReads: ChainReadPort;
}
