import { describe, expect, it } from "vitest";
import { replyToMessage } from "@/features/chat/chatService";

describe("chat determinista", () => {
  it("extrae medidas y límite del escenario", () => {
    const reply = replyToMessage("Habitación de 4 x 3 metros, presupuesto máximo 180 U");
    expect(reply.extracted).toEqual({ width: 4, length: 3, maxBudget: 180 });
  });

  it("pide las medidas cuando faltan", () => {
    expect(replyToMessage("Quiero cerámicos").message).toMatch(/largo y el ancho/i);
  });
});

