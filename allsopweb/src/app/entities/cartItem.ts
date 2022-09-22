export class CartItem {
  constructor(parameters?: Partial<CartItem>) {
    Object  .assign(this, parameters);
  }

  id?: string;
  productId?: string;
  quantity?: number;
  cartId?: string;
  total?: number;
}