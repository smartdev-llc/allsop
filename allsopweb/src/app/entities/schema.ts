import { normalize as _normalize, schema } from 'normalizr';
import { IAppState } from '../store/store';

export const category = new schema.Entity('categories');
export const categories = new schema.Array(category);

export const product = new schema.Entity('products');
export const products = new schema.Array(product);

export const cart = new schema.Entity('carts');
export const carts = new schema.Array(cart);

export const cartItem = new schema.Entity('cartItems');
export const cartItems = new schema.Array(cartItem);

category.define({
  products: [product],
});

product.define({
  category: category,
});

cart.define({
  cartItems: [cartItem],
});

cartItem.define({
  product: product,
});

const normalize = function (data: any, t: any): {
  entities: IAppState,
  result: any[]
} {
  return _normalize(data, t);
};

export const normalizeCategory = (data: any) => normalize(data, category);
export const normalizeCategories = (data: any) => normalize(data, categories);

export const normalizeProduct = (data: any) => normalize(data, product);
export const normalizeProducts = (data: any) => normalize(data, products);

export const normalizeCart = (data: any) => normalize(data, cart);
export const normalizeCarts = (data: any) => normalize(data, carts);

export const normalizeCartItem = (data: any) => normalize(data, cartItem);
export const normalizeCartItems = (data: any) => normalize(data, cartItems);