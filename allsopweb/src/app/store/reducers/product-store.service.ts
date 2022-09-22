import { Injectable } from '@angular/core';
import { IStoreService } from './i-store-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreContextService } from './store-context.service';
import { Product } from 'src/app/entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService implements IStoreService<Product, string> {

  get(): Observable<Product[]> {
    return this.context.Products.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<Product | undefined> {
    return this.context.Products.pipe(map(s => s[id]));
  }

  constructor(private context: StoreContextService) { }
}
