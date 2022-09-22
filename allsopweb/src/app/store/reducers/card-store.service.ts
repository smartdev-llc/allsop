import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from 'src/app/entities/cart';
import { IStoreService } from './i-store-service';
import { StoreContextService } from './store-context.service';

@Injectable({
  providedIn: 'root'
})
export class CartStoreService implements IStoreService<Cart, string> {

  constructor(private context: StoreContextService) { }
  
  get(): Observable<Cart[]> {
    return this.context.Carts.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<Cart | undefined> {
    return this.context.Carts.pipe(map(s => s[id]));
  }
}
