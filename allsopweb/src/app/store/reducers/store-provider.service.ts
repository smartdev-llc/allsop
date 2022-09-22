import { Injectable } from '@angular/core';
import { CartItemStoreService } from './card-item-store.service';
import { CartStoreService } from './card-store.service';
import { CategoryStoreService } from './category-store.service';
import { ProductStoreService } from './product-store.service';

@Injectable({
  providedIn: 'root'
})
export class StoreProviderService {

  constructor(
    public CategoryStore: CategoryStoreService,
    public ProductStore: ProductStoreService,
    public CartStore: CartStoreService,
    public CartItemStore: CartItemStoreService,
  ) { }
}
