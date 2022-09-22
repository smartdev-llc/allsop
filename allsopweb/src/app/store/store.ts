import * as _ from 'lodash';
import { createReducer, on } from "@ngrx/store";
import { Table } from './table';
import { CategoryActionsService } from './actions/category-actions.service';
import { ProductActionsService } from './actions/product-actions.service';
import { CartActionsService } from './actions/cart-actions.service';
import { CartItemActionsService } from './actions/card-item-actions.service';

export interface IAppState {
  categories: Table<string>;
  products: Table<string>;
  carts: Table<string>;
  cartItems: Table<string>;
}

export const INITIAL_STATE: IAppState = {
  categories: new Table<string>(),
  products: new Table<string>(),
  carts: new Table<string>(),
  cartItems: new Table<string>,
};

const remove = (state: Table<string>, action: any) => {
  const result = {
    ids: _.difference(state.ids, action.payload.ids),
    list: _.omit(state.list, action.payload.ids)
  };
  return result;
};

const addOrUpdate = (state: Table<string>, action: any) => {
  const addings = _.difference(action.payload.ids, state.ids);
  const updatings = _.intersection(action.payload.ids, state.ids);
  let addingResult: Table<string> = state;
  if (addings.length) {
    addingResult = {
      ids: [...state.ids, ...addings].sort(),
      list: {
        ...state.list,
        ..._.pick(action.payload.list, addings)
      }
    };
  }

  let updatingResult = addingResult;
  if (updatings.length) {
    updatingResult = {
      ...addingResult,
      list: {
        ...addingResult.list,
        ..._.mergeWith({}, _.pick(addingResult.list, updatings), _.pick(action.payload.list, updatings), (objValue: any, srcValue: any) => {
          if (_.isArray(objValue) && _.isArray(srcValue)) {
            return srcValue;
          } else {
            return undefined;
          }
        })
      }
    };
  }
  return state === updatingResult || _.isEqual(state, updatingResult) === true ? state : updatingResult;
};

const categories = createReducer(INITIAL_STATE.categories,
  on(CategoryActionsService.addOrUpdate, (state, action) => addOrUpdate(state, action)));
const products = createReducer(INITIAL_STATE.products,
  on(ProductActionsService.addOrUpdate, (state, action) => addOrUpdate(state, action)));
const carts = createReducer(INITIAL_STATE.carts,
  on(CartActionsService.addOrUpdate, (state, action) => addOrUpdate(state, action)));
const cartItems = createReducer(INITIAL_STATE.cartItems,
  on(CartItemActionsService.addOrUpdate, (state, action) => addOrUpdate(state, action)),
  on(CartItemActionsService.remove, (state, action) => remove(state, action)),
);

export const rootReducer = {
  categories: categories,
  products: products,
  carts: carts,
  cartItems: cartItems,
};