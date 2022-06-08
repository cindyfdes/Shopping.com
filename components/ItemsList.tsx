import React from "react";
import { Product } from "../types/product";
import Items from "./Items";
interface IProps {
  products: Product[];
}
const ItemsList = ({ products }: IProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-y-10 gap-x-6">
      {products?.map((product) => (
        <Items product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ItemsList;
