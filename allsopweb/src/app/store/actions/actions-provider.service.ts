import { Injectable } from '@angular/core';
import { CartActionsService } from './cart-actions.service';
import { CartItemActionsService } from './card-item-actions.service';
import { CategoryActionsService } from './category-actions.service';
import { ProductActionsService } from './product-actions.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsProviderService {
  constructor(
    public CategoryActions: CategoryActionsService,
    public ProductActions: ProductActionsService,
    public CartActions: CartActionsService,
    public CartItemActions: CartItemActionsService,
  ) { }
}
