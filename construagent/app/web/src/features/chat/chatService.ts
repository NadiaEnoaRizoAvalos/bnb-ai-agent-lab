export interface ChatReply {
  message: string;
  extracted?: { width: number; length: number; maxBudget?: number };
}

/** Interpreta solamente el caso acotado de la demo; no utiliza un modelo de IA. */
export function replyToMessage(message: string): ChatReply {
  const text = message.trim().toLowerCase().replaceAll(",", ".");
  if (!text) return { message: "Escribí las medidas de la habitación, por ejemplo: 4 x 3 metros." };

  const dimensions = text.match(/(\d+(?:\.\d+)?)\s*(?:x|por)\s*(\d+(?:\.\d+)?)/i);
  if (!dimensions) {
    return { message: "Necesito el largo y el ancho. Podés escribir: habitación de 4 x 3 metros." };
  }

  const budget = text.match(/(?:presupuesto|máximo|maximo|hasta)\D{0,15}(\d+(?:\.\d+)?)/i);
  const extracted = {
    width: Number(dimensions[1]),
    length: Number(dimensions[2]),
    ...(budget ? { maxBudget: Number(budget[1]) } : {}),
  };
  return {
    message: budget
      ? `Entendí una habitación de ${extracted.width} × ${extracted.length} m y un máximo de ${extracted.maxBudget} U. Ya podés calcular y comparar.`
      : `Entendí una habitación de ${extracted.width} × ${extracted.length} m. ¿Querés indicar también un presupuesto máximo?`,
    extracted,
  };
}

