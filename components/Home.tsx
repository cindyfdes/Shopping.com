import { GetServerSideProps } from "next";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { filterCategories } from "../types/enum";
import { Product } from "../types/product";
import { getproducts } from "../utilities/getProducts";
import Items from "./Items";
interface Props {
  products: Product[];
}
export const ItemsList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-y-10 gap-x-6">
      {products.map((product) => (
        <div>
          <Items product={product} key={product.id} />
        </div>
      ))}
    </div>
  );
};
