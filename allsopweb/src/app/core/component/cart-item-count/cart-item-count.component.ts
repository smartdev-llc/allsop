import { Component, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil } from 'rxjs';
import { AppEvent } from 'src/app/services/app-event';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-cart-item-count',
  templateUrl: './cart-item-count.component.html',
  styleUrls: ['./cart-item-count.component.scss']
})
export class CartItemCountComponent extends BaseComponent {

  itemCount?: number;
  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.AppEvent.AppEventBus.observable.pipe(
      filter((e?: AppEvent) => e?.type === 'CART_READY'),
      switchMap(e => {
        const cartId = localStorage.getItem('cartId');
        return this.Store.CartItemStore.getByCartId(cartId?.toString()!);
      }),
      takeUntil(this.UnSub)
    ).subscribe(cartItems => this.itemCount = cartItems ? cartItems.length : 0);
  }

}
