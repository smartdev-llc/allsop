import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/core/base.component';
import { Product } from 'src/app/entities/product';
import { ProductsHttpService } from 'src/app/services/http/products.http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  products: Product[] = [];
  constructor(private productsHttp: ProductsHttpService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.productsHttp.get().pipe(takeUntil(this.UnSub)).subscribe();

    // Get products from store
    this.Store?.ProductStore.get().pipe(takeUntil(this.UnSub)).subscribe(products => {
      this.products = products;
    });
  }

}
