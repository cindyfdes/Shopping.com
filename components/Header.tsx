import React, { useState } from "react";
import { Product } from "../types/product";
import ShoppingCart from "./ShoppingCart";

const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 ">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src="/svg/logo.svg" width="30" height="30"></img>
          <span className="font-semibold text-xl tracking-tight pl-2">
            Shopping.com
          </span>
        </div>
        <button
          className="items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-teal-400 hover:border-white"
          onClick={() => {
            console.log("header on click");
            setOpenCart(!openCart);
          }}
        >
          Cart
        </button>
      </nav>
      {openCart && <ShoppingCart />}
    </div>
  );
};

export default Header;
