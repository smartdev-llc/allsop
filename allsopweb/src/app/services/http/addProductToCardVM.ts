export interface AddProductToCardVM {
  productId: string;
  cartId: string;
}

export interface RemoveCartItemVM {
  cartItemId: string;
  cartId: string;
}

export interface UpdateCartItemVM {
  cartItemId: string;
  cartId: string;
  quantity: number;
}

export interface ApplyPromotionCodeVM {
  cartId: string;
  promotionCode: string;
}