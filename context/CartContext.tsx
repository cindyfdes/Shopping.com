import { createContext, Dispatch, useReducer, useState } from "react";
import { Cart } from "../types/cart";
interface cartContents {
  cart: Cart[];
  updateCart: Dispatch<cartActions>;
}

const initialState: Cart[] = [];

interface cartActions {
  type: cartActionTypes;
  payload: Cart;
}
export const cartContext = createContext<cartContents>({
  cart: [],
  updateCart: () => {},
});
export enum cartActionTypes {
  ADD = "add",
  REMOVE = "remove",
  INCREMENT_QTY = "increment_qty",
  DECREMENT_QTY = "decrement_qty",
  UPDATE_QTY = "update_qty",
}
const setCartItems = (state: Cart[], action: cartActions) => {
  switch (action.type) {
    case cartActionTypes.ADD:
      console.log("add");

      return [...state, action.payload];
    case cartActionTypes.REMOVE:
      return state.filter((item) => item.id !== action.payload.id);
    case cartActionTypes.INCREMENT_QTY:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    case cartActionTypes.DECREMENT_QTY:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );

    default:
      return state;
  }
};

export const CartProvider = (props: any) => {
  const [cart, updateCart] = useReducer(setCartItems, initialState);
  return (
    <cartContext.Provider value={{ cart, updateCart }}>
      {props.children}
    </cartContext.Provider>
  );
};
