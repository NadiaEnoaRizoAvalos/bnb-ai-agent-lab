import { describe, expect, it } from "vitest";
import { DEMO_NOTICE } from "@/lib/demoFlags";

describe("fase 0 — arranque del proyecto", () => {
  it("expone la etiqueta de datos demostrativos", () => {
    expect(DEMO_NOTICE).toMatch(/demostrativ/i);
  });
});
