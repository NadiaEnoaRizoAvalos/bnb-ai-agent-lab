export type ProductKind = "ceramico" | "adhesivo" | "pastina";

export interface Product {
  id: string;
  supplierId: string;
  kind: ProductKind;
  name: string;
  unit: "caja" | "bolsa";
  price: number;
  stock: number;
  coverageM2: number;
  attributes: string[];
}

export interface Supplier {
  id: string;
  name: string;
  deliveryDays: number;
  products: Product[];
}

export interface BudgetRequest {
  width: number;
  length: number;
  wastePercent?: number;
  maxBudget?: number;
  supplierId?: string;
}

export interface BudgetLine {
  productId: string;
  name: string;
  quantity: number;
  unit: Product["unit"];
  unitPrice: number;
  subtotal: number;
}

export interface BudgetResult {
  supplierId: string;
  supplierName: string;
  areaM2: number;
  areaWithWasteM2: number;
  wastePercent: number;
  lines: BudgetLine[];
  total: number;
  withinBudget: boolean | null;
  available: boolean;
  warnings: string[];
}

