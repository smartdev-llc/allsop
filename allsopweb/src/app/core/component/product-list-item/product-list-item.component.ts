import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/entities/cart';
import { Product } from 'src/app/entities/product';
import { BaseComponent } from '../../base.component';
import { filter, switchMap, takeUntil } from "rxjs";
import { CartHttpService } from 'src/app/services/http/cart-http.service';
import { AppEvent } from 'src/app/services/app-event';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent extends BaseComponent {

  @Input() product?: Product;
  cart?: Cart;
  constructor(private cardHttp: CartHttpService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.AppEvent.AppEventBus.observable.pipe(
      filter((e?: AppEvent) => e?.type === 'CART_READY'),
      switchMap(e => {
        const cartId = localStorage.getItem('cartId');
        return this.Store.CartStore.getById(cartId?.toString()!);
      }),
      takeUntil(this.UnSub)
    ).subscribe(cart => this.cart = cart);
  }

  addProductToCard(cart: Cart) {
    if (cart && this.product?.availableQuantity) {
      this.cardHttp.addProductToCard({
        cartId: cart.id!,
        productId: this.product.id!,
      }).pipe(takeUntil(this.UnSub)).subscribe();
    }
  }

}
