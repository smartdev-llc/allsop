import { Observable } from 'rxjs';

export interface IStoreService<T, K> {
  get(): Observable<T[]>;
  getById(id: K): Observable<T | undefined>;
}
