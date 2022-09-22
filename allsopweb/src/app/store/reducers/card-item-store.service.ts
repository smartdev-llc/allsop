import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from 'src/app/entities/cartItem';
import { IStoreService } from './i-store-service';
import { StoreContextService } from './store-context.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemStoreService implements IStoreService<CartItem, string> {

  constructor(private context: StoreContextService) { }
  
  get(): Observable<CartItem[]> {
    return this.context.CartItems.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<CartItem | undefined> {
    return this.context.CartItems.pipe(map(s => s[id]));
  }
  getByCartId(cartId: string): Observable<CartItem[]> {
    return this.get().pipe(map(items => items.filter(item => item.cartId === cartId)));
  }
}
