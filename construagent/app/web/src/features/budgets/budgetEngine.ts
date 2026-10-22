import type { BudgetLine, BudgetRequest, BudgetResult, Product, Supplier } from "@/types/domain";

const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateBudget(request: BudgetRequest, supplier: Supplier): BudgetResult {
  const wastePercent = request.wastePercent ?? 10;
  const areaM2 = money(request.width * request.length);
  const areaWithWasteM2 = money(areaM2 * (1 + wastePercent / 100));
  const warnings: string[] = [];
  const lines = (["ceramico", "adhesivo", "pastina"] as const).map((kind) => {
    const product = supplier.products.find((item) => item.kind === kind);
    if (!product) throw new Error(`${supplier.name} no posee un producto de tipo ${kind}.`);
    return lineFor(product, areaWithWasteM2, warnings);
  });
  const total = money(lines.reduce((sum, line) => sum + line.subtotal, 0));

  return {
    supplierId: supplier.id,
    supplierName: supplier.name,
    areaM2,
    areaWithWasteM2,
    wastePercent,
    lines,
    total,
    withinBudget: request.maxBudget === undefined ? null : total <= request.maxBudget,
    available: warnings.length === 0,
    warnings,
  };
}

function lineFor(product: Product, area: number, warnings: string[]): BudgetLine {
  const quantity = Math.ceil(area / product.coverageM2);
  if (quantity > product.stock) warnings.push(`Stock insuficiente de ${product.name}: se necesitan ${quantity} y hay ${product.stock}.`);
  return {
    productId: product.id,
    name: product.name,
    quantity,
    unit: product.unit,
    unitPrice: product.price,
    subtotal: money(quantity * product.price),
  };
}

