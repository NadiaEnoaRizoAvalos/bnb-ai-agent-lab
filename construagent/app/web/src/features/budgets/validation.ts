import type { BudgetRequest } from "@/types/domain";

export class BudgetValidationError extends Error {
  constructor(public readonly details: string[]) {
    super(details.join(" "));
    this.name = "BudgetValidationError";
  }
}

export function validateBudgetRequest(input: unknown): BudgetRequest {
  if (!input || typeof input !== "object") {
    throw new BudgetValidationError(["La solicitud debe ser un objeto."]);
  }
  const data = input as Record<string, unknown>;
  const errors: string[] = [];
  const width = numeric(data.width, "El ancho", errors);
  const length = numeric(data.length, "El largo", errors);
  const wastePercent = data.wastePercent === undefined ? 10 : numeric(data.wastePercent, "El desperdicio", errors, true);
  const maxBudget = data.maxBudget === undefined || data.maxBudget === "" ? undefined : numeric(data.maxBudget, "El presupuesto máximo", errors, true);

  if (wastePercent > 50) errors.push("El desperdicio no puede superar 50 %.");
  if (errors.length) throw new BudgetValidationError(errors);

  return {
    width,
    length,
    wastePercent,
    maxBudget,
    supplierId: typeof data.supplierId === "string" ? data.supplierId : undefined,
  };
}

function numeric(value: unknown, label: string, errors: string[], allowZero = false): number {
  const parsed = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof parsed !== "number" || !Number.isFinite(parsed)) {
    errors.push(`${label} debe ser un número válido.`);
    return 0;
  }
  if (allowZero ? parsed < 0 : parsed <= 0) errors.push(`${label} debe ser ${allowZero ? "cero o mayor" : "mayor que cero"}.`);
  return parsed;
}

