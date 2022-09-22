import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { getActionData, IActionData } from './action-data';

@Injectable({
  providedIn: 'root'
})
export class CategoryActionsService {

  constructor(private store: Store) { }

  static addOrUpdate = createAction('addOrUpdateCategories', props<IActionData>());
  addOrUpdate(list: any, description: string = '') {
    if (!list) {
      return;
    }
    const actionData = getActionData(list, description);
    return this.store.dispatch(CategoryActionsService.addOrUpdate(actionData));
  }
}
