import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { getActionData, IActionData } from './action-data';

@Injectable({
  providedIn: 'root'
})
export class CartItemActionsService {

  constructor(private store: Store) { }

  static addOrUpdate = createAction('addOrUpdateCartItems', props<IActionData>());
  addOrUpdate(list: any, description: string = '') {
    if (!list) {
      return;
    }
    const actionData = getActionData(list, description);
    return this.store.dispatch(CartItemActionsService.addOrUpdate(actionData));
  }

  static remove = createAction('removeCartItems', props<IActionData>());
  remove(list: any, description: string = '') {
    if (!list) {
      return;
    }
    const actionData = getActionData(list, description);
    return this.store.dispatch(CartItemActionsService.remove(actionData));
  }
}
