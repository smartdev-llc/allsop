import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cart } from 'src/app/entities/cart';
import { CartItem } from 'src/app/entities/cartItem';
import { normalizeCart, normalizeCartItems } from 'src/app/entities/schema';
import { ActionsProviderService } from 'src/app/store/actions/actions-provider.service';
import { environment } from 'src/environments/environment';
import { AddProductToCardVM, ApplyPromotionCodeVM, RemoveCartItemVM, UpdateCartItemVM } from './addProductToCardVM';

@Injectable({
  providedIn: 'root'
})
export class CartHttpService {

  constructor(private http: HttpClient, private actions: ActionsProviderService) {

  }

  get(id: string): Observable<Cart> {
    return this.http.get(`${environment.apiUrl}/api/cart/${id}`).pipe(tap(cart => {
      if (cart) {
        const data = normalizeCart(cart);
        this.actions.CartActions.addOrUpdate(data.entities.carts);
        this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
        this.actions.ProductActions.addOrUpdate(data.entities.products);
        this.actions.CategoryActions.addOrUpdate(data.entities.categories);
      }
    }));
  }

  post(): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/api/cart/create-cart`, null).pipe(tap(card => {
      const data = normalizeCart(card);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
    }));
  }

  addProductToCard(vm: AddProductToCardVM): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/api/cart/add-product-to-cart`, vm).pipe(tap(card => {
      const data = normalizeCart(card);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories)
    }));
  }

  removeCartItem(vm: RemoveCartItemVM): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/api/cart/remove-cart-item`, vm).pipe(tap(card => {
      const data = normalizeCart(card);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories);

      const removingItems: CartItem[] = [
        {
          id: vm.cartItemId,
          cartId: vm.cartId,
        }
      ];
      const removingData = normalizeCartItems(removingItems);

      this.actions.CartItemActions.remove(removingData.entities.cartItems);
    }));
  }

  updateCartItem(vm: UpdateCartItemVM): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/api/cart/update-cart-item`, vm).pipe(tap(card => {
      const data = normalizeCart(card);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories)
    }));
  }

  applyPromotionCode(vm: ApplyPromotionCodeVM): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/api/cart/apply-promotion-code`, vm).pipe(tap(card => {
      const data = normalizeCart(card);
      this.actions.CartActions.addOrUpdate(data.entities.carts);
      this.actions.CartItemActions.addOrUpdate(data.entities.cartItems);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories)
    }));
  }
}
