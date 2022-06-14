import React, { useContext } from "react";
import { cartContext, cartActionTypes } from "../context/cartContext";
import { Cart } from "../types/cart";
import { Action } from "../types/cartItems";
import { Product } from "../types/product";
import { truncate } from "../utilities/common";
interface IProps {
  product: Product;
}
const Items = ({ product }: IProps) => {
  const { cart, updateCart } = useContext(cartContext);
  return (
    <div
      key={product.id}
      className="group  border-2 border-gray-200 p-3 border-md flex flex-col "
    >
      <div className="  w-full min-h-80  aspect-w-1 aspect-h-1 rounded-md overflow-hidden  lg:h-80 lg:aspect-none">
        <img
          src={product.image}
          className="w-50 h-50  object-center object-contain lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {truncate(product.description, 100)}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
      {cart?.some((cartItem: Cart) => cartItem.id === product.id) ? (
        <div className="flex ">
          <div
            className="text-sm bg-red-500 text-white p-2  px-2  rounded w-36"
            onClick={(e) => {
              updateCart({
                type: cartActionTypes.REMOVE,
                payload: {
                  id: product.id,
                  title: product.title,
                  qty: 1,
                  price: product.price,
                  image: product.image,
                },
              });
            }}
          >
            Remove from cart
          </div>
          <div></div>
        </div>
      ) : (
        <div
          className="text-sm bg-blue-500 text-white p-2  px-2 rounded W-36"
          onClick={(e) => {
            console.log("clicked");

            updateCart({
              type: cartActionTypes.ADD,
              payload: {
                id: product.id,
                title: product.title,
                qty: 1,
                price: product.price,
                image: product.image,
              },
            });
          }}
        >
          {product.quantity > 0 ? <p>Add to Cart</p> : <p>Out of stock</p>}
        </div>
      )}
    </div>
  );
};

export default Items;
