import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/entities/product';
import { normalizeProducts } from 'src/app/entities/schema';
import { ActionsProviderService } from 'src/app/store/actions/actions-provider.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {

  constructor(private http: HttpClient, private actions: ActionsProviderService) { }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/api/products`).pipe(tap(products => {
      const data = normalizeProducts(products);
      this.actions.CategoryActions.addOrUpdate(data.entities.categories);
      this.actions.ProductActions.addOrUpdate(data.entities.products);
    }));
  }
}
