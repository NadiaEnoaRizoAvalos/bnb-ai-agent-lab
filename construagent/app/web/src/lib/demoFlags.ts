/** Textos que deben aparecer junto a precios y pagos ficticios. */
export const DEMO_NOTICE =
  "Datos demostrativos: precios, stock y pagos están simulados. No son cotizaciones reales ni operaciones blockchain.";

export const isDemoMode = (): boolean =>
  process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
