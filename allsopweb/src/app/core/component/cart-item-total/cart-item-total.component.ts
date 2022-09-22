import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { filter, map, Observable, of, switchMap, takeUntil } from 'rxjs';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-cart-item-total',
  templateUrl: './cart-item-total.component.html',
  styleUrls: ['./cart-item-total.component.scss']
})
export class CartItemTotalComponent extends BaseComponent {

  // @Input() quantity?: number;
  // @Input() productId?: string;
  @Input() id?: string;
  total?: number;
  constructor() {
    super();
    // this.OnChanges$.observable.pipe(
    //   map(changes => ({
    //     quantity: changes['quantity']?.currentValue,
    //     productId: changes['productId']?.currentValue,
    //   })),
    //   switchMap(data => {
    //     return data.productId && data.quantity ?
    //       this.Store.ProductStore.getById(data.productId).pipe(map(p => ({
    //         product: p,
    //         quantity: data.quantity,
    //       }))) : of(undefined);
    //   }),
    //   takeUntil(this.UnSub),
    // ).subscribe(data => {
    //   this.total = (data?.product?.price && data?.quantity) ? data?.product?.price * <number>data?.quantity : undefined;
    // });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.Store.CartItemStore.getById(this.id!).pipe(
      takeUntil(this.UnSub)
    ).subscribe(item => this.total = item?.total);
  }

}
