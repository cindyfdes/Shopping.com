import { Cart } from "./cart";
import { Context } from "./context";
import { Product } from "./product";

export interface CartItemsState {
  products: Product[];
}

export enum Action {
  ADD,
  REMOVE,
}
export interface CartAction {
  type: Action;
  payload: Context;
}
