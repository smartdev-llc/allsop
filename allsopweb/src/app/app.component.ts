import { Component } from '@angular/core';
import { BaseComponent } from './core/base.component';
import { CartHttpService } from './services/http/cart-http.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'allsopweb';

  constructor(private cartHttp: CartHttpService) {
    super();
  }
  override ngOnInit(): void {
    super.ngOnInit();
    // Load card from localstore
    const cartId = localStorage.getItem('cartId');
    // Already exist card, get card data from server
    if (cartId) {
      this.Logger.log(`Found cardId on client = ${cartId}`);
      this.cartHttp.get(cartId).pipe(takeUntil(this.UnSub)).subscribe({
        error: error => { // Not found card info => create a new one
          if (error.status === 404) {
            this.Logger.log(`Not found cart instance from server`)
            this.cartHttp.post().pipe(takeUntil(this.UnSub)).subscribe(cart => {
              this.Logger.log(`Created cart instance from server`);
              this.Logger.log(cart);
              localStorage.setItem('cartId', cart.id!);
              this.Logger.log(`Publish CART_READY event`);
              this.AppEvent.AppEventBus.onChanged({
                type: 'CART_READY',
              });
            });
          }
        },
        next: cart => {
          if (!cart) {
            this.cartHttp.post().pipe(takeUntil(this.UnSub)).subscribe(cart => {
              localStorage.setItem('cartId', cart.id!);
              this.AppEvent.AppEventBus.onChanged({
                type: 'CART_READY',
              });
            });
          } else {
            this.AppEvent.AppEventBus.onChanged({
              type: 'CART_READY',
            });
          }
        },
      });
    } else {
      // Create new card instance if need
      this.Logger.log(`Not found cardId on client`);
      this.cartHttp.post().pipe(takeUntil(this.UnSub)).subscribe(cart => {
        this.Logger.log(`Created cart instance from server`);
        this.Logger.log(cart);
        localStorage.setItem('cartId', cart.id!);
        this.Logger.log(`Publish CART_READY event`);
        this.AppEvent.AppEventBus.onChanged({
          type: 'CART_READY',
        });
      });
    }
  }
}
