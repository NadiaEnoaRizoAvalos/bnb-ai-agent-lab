import type { Supplier } from "@/types/domain";

/** Catálogo ficticio y reproducible para la demostración local. */
export const suppliers: Supplier[] = [
  {
    id: "obra-norte",
    name: "Corralón Obra Norte",
    deliveryDays: 2,
    products: [
      { id: "on-cer-45", supplierId: "obra-norte", kind: "ceramico", name: "Cerámico Arena 45 × 45", unit: "caja", price: 18.5, stock: 30, coverageM2: 2.1, attributes: ["interior", "mate", "45x45"] },
      { id: "on-adh-25", supplierId: "obra-norte", kind: "adhesivo", name: "Adhesivo interior 25 kg", unit: "bolsa", price: 8.2, stock: 20, coverageM2: 5, attributes: ["interior"] },
      { id: "on-pas-5", supplierId: "obra-norte", kind: "pastina", name: "Pastina gris 5 kg", unit: "bolsa", price: 5.4, stock: 12, coverageM2: 20, attributes: ["gris", "interior"] },
    ],
  },
  {
    id: "casa-sur",
    name: "Materiales Casa Sur",
    deliveryDays: 4,
    products: [
      { id: "cs-cer-45", supplierId: "casa-sur", kind: "ceramico", name: "Cerámico Piedra 45 × 45", unit: "caja", price: 17.2, stock: 24, coverageM2: 2, attributes: ["interior", "mate", "45x45"] },
      { id: "cs-adh-25", supplierId: "casa-sur", kind: "adhesivo", name: "Adhesivo estándar 25 kg", unit: "bolsa", price: 8.8, stock: 18, coverageM2: 5, attributes: ["interior"] },
      { id: "cs-pas-5", supplierId: "casa-sur", kind: "pastina", name: "Pastina cemento 5 kg", unit: "bolsa", price: 4.9, stock: 16, coverageM2: 20, attributes: ["gris", "interior"] },
    ],
  },
];

export function getSupplier(id: string): Supplier | undefined {
  return suppliers.find((supplier) => supplier.id === id);
}

