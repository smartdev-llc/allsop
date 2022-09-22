export class Product {
  constructor(parameters?: Partial<Product>) {
    Object.assign(this, parameters);
  }

  id?: string;
  name?: string;
  oldPrice?: number;
  price?: number;
  availableQuantity?: number;
  categoryId?: string;
}