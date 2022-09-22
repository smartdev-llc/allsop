import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/entities/product';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-product-name',
  templateUrl: './product-name.component.html',
  styleUrls: ['./product-name.component.scss']
})
export class ProductNameComponent extends BaseComponent {

  @Input() id?: string;
  product$: Observable<Product | undefined> = of(undefined);
  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.product$ = this.Store?.ProductStore.getById(this.id!)!;
  }

}
