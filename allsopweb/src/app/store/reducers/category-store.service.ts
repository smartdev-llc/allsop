import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/entities/category';
import { IStoreService } from './i-store-service';
import { StoreContextService } from './store-context.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryStoreService implements IStoreService<Category, string> {

  constructor(private context: StoreContextService) { }
  
  get(): Observable<Category[]> {
    return this.context.Categories.pipe(map(s => Object.values(s)));
  }
  getById(id: string): Observable<Category | undefined> {
    return this.context.Categories.pipe(map(s => s[id]));
  }
}
