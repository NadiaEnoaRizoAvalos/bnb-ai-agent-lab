import { expect, test } from "@playwright/test";

test("recorre presupuesto, comparación y negociación simulada", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /calculá materiales/i })).toBeVisible();

  await page.getByRole("button", { name: "Calcular y comparar" }).click();
  await expect(page.getByText("Presupuestos calculados con datos demostrativos.")).toBeVisible();
  await expect(page.getByText("Materiales Casa Sur", { exact: true })).toBeVisible();
  await expect(page.getByText("Recomendado")).toBeVisible();

  await page.locator(".budget-card.recommended").getByRole("button", { name: "Solicitar oferta" }).click();
  await expect(page.getByText("requiere aprobacion")).toBeVisible();
  await page.getByRole("button", { name: "Aprobar simulación" }).click();
  await expect(page.getByText("confirmada", { exact: false })).toBeVisible();
  await expect(page.getByText(/ORD-NEG-/)).toBeVisible();
});

test("el chat completa las medidas de manera determinista", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Mensaje").fill("Habitación de 5 x 2 metros, presupuesto máximo 170 U");
  await page.getByRole("button", { name: "Enviar" }).click();
  await expect(page.getByText(/entendí una habitación de 5 × 2/i)).toBeVisible();
  await expect(page.getByLabel("Ancho (m)")).toHaveValue("5");
  await expect(page.getByLabel("Largo (m)")).toHaveValue("2");
});
