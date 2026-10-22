import { NextResponse } from "next/server";
import { getIntegrationPorts } from "@/integrations/container";

export async function GET() {
  const integrations = getIntegrationPorts();
  return NextResponse.json({
    mode: integrations.mode,
    capabilities: integrations.capabilities,
    notice: "Diagnóstico local. No comprueba BNB Agent Studio, blockchain, wallets ni servicios externos.",
  });
}

