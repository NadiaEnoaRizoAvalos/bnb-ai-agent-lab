import { suppliers } from "@/features/catalog/catalog";
import type { CatalogPort } from "../contracts";

export const simulatedCatalogAdapter: CatalogPort = {
  async listSupplierIds() {
    return suppliers.map((supplier) => supplier.id);
  },
};

