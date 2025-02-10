"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { removeFromBag } from "../app/redux/bagSlice";
import { Product } from "../app/redux/type";

interface BagProductProps {
  product: Product;
}

const BagProduct : React.FC<BagProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white h-[70px] w-[70px] flex justify-center items-center relative group rounded-xl">
      <img
        src={product.image}
        alt=""
        className="max-h-[65px] max-w-[65px] px-1 py-1"
      />
      <button
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white
          flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 
          group-hover:opacity-100 font-cabin rounded-xl"
        onClick={() => dispatch(removeFromBag(product.id))}
      >
        Remove
      </button>
    </div>
  );
};

export default BagProduct;
