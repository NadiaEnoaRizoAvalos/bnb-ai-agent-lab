import type { IntegrationMode } from "./contracts";

/** Configuración fail-closed: un valor desconocido nunca activa servicios reales. */
export function getIntegrationMode(
  environment: Readonly<Record<string, string | undefined>> = process.env,
): IntegrationMode {
  const configured = environment.CONSTRUAGENT_INTEGRATION_MODE ?? "simulation";
  if (configured !== "simulation") {
    throw new Error(`Modo de integración no disponible: ${configured}. Solo simulation está implementado.`);
  }
  return configured;
}
