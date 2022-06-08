import { Cart } from "./cart";
import { Product } from "./product";

export interface Context {
  product: Product[];
  cart: Cart[];
}
