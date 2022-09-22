import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/core/base.component';
import { Cart } from 'src/app/entities/cart';
import { CartItem } from 'src/app/entities/cartItem';
import { Promotion } from 'src/app/entities/promotion';
import { CartHttpService } from 'src/app/services/http/cart-http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseComponent {

  items: CartItem[] = [];
  cartId?: string;
  cart?: Cart;
  promotions?: Promotion[] = [];
  promotionCodeControl = new FormControl('');
  constructor(private cartHttp: CartHttpService) {
    super()
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.cartId = localStorage.getItem('cartId')?.toString();
    this.Store?.CartItemStore.getByCartId(this.cartId!)
      .pipe(takeUntil(this.UnSub)).subscribe(items => this.items = items);
    this.Store.CartStore.getById(this.cartId!).pipe(
      takeUntil(this.UnSub)
    ).subscribe(cart => {
      this.cart = cart;
      this.promotions = cart?.promotions?.filter(p => p.reducedTotal! > 0)
    });
  }

  removeCartItemClickedHandler = (item: CartItem) => {
    this.Logger.log(`item = `);
    this.Logger.log(item);
    // Call to http
    this.cartHttp.removeCartItem({
      cartId: item.cartId!,
      cartItemId: item.id!
    }).pipe(takeUntil(this.UnSub)).subscribe();
  };

  saveCartItemClickedHandler = (item: CartItem, quantity: string) => {
    this.cartHttp.updateCartItem({
      cartId: item.cartId!,
      cartItemId: item.id!,
      quantity: +quantity,
    }).pipe(takeUntil(this.UnSub)).subscribe();
  };

  applyPromotionCodeClickedHandler = () => {
    const promotionCode = this.promotionCodeControl.value;
    this.Logger.debug(`Promotion code = ${this.promotionCodeControl.value}`);
    this.cartHttp.applyPromotionCode({
      cartId: this.cartId!,
      promotionCode: promotionCode!,
    }).pipe(
      takeUntil(this.UnSub)
    ).subscribe({
      next: v => {
        this.Logger.debug(`Apply successfully promotion code`);
      },
      error: e => {
        this.Logger.error(`Failed to apply promotion code`, e);
        if (e.status === 400) {
          alert(e.error);
        }
      },
    });
  };
}
