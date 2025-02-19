"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoBagHandleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BagProduct from "./BagProduct"; // Import the new BagProduct component
import { selectBagProducts } from "../app/redux/selector";


const Bag: React.FC = () => {
  const bagProducts = useSelector(selectBagProducts); // using selector function

  const pathname = usePathname();

  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const SHIPPING_COST = 6.99;
  const GST_PERCENTAGE = 17;

  const itemsTotal = bagProducts.reduce(
    (acc, product) => acc + product.price * (product.count || 1),
    0
  );

  const estimatedGST = (itemsTotal * GST_PERCENTAGE) / 100;

  const orderTotal = itemsTotal + SHIPPING_COST + estimatedGST - discount;

  const applyCoupon = () => {
    const hardcodedCoupons: { [key: string]: number } = {
      SAVE10: 10,
      SAVE20: 20,
    };

    if (hardcodedCoupons[coupon]) {
      setDiscount(hardcodedCoupons[coupon]);
      toast.success(`Coupon applied! You saved $${hardcodedCoupons[coupon]}.`, {
        position: "bottom-right",
      });
    } else {
      toast.error("Invalid coupon code.", {
        position: "bottom-right",
      });
      setDiscount(0);
    }
  };

  return (
    <div className="bag flex gap-1 font-cabin fixed top-0 right-0 ">
      <div className="border border-lightgrey rounded-md mx-3 h-[550px] my-12"></div>

      <div className="w-72">
        <div className="flex justify-center items-center h-20">
          <h1 className="text-center text-4xl">
            {pathname === "/bagItems" ? "Checkout" : "Bag"}
          </h1>
        </div>

        {pathname !== "/bagItems" && (
          <div className="grid grid-cols-3 gap-2 my-2">
            {bagProducts.length > 0 ? (
              bagProducts.map((product, index) => (
                <BagProduct key={index} product={product} />   //we are passing product prop mean the product that are in the bag
              ))
            ) : (
              <p className="font-cabin col-span-3 text-center text-darkgrey">
                Your bag is empty
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center items-center font-cabin">
          {pathname === "/bagItems" ? (
            <div className="bg-white shadow-md rounded-lg p-6 mr-2">
              <h2 className="text-xl mb-4">Order Summary</h2>
              <ul className="space-y-2">
                <li className="flex justify-between font-cabin text-lightgrey">
                  <span>Items:</span>
                  <span>${itemsTotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between font-cabin text-lightgrey">
                  <span>Shipping:</span>
                  <span>${SHIPPING_COST.toFixed(2)}</span>
                </li>
                <li className="flex justify-between font-cabin text-lightgrey">
                  <span>Estimated GST:</span>
                  <span>${estimatedGST.toFixed(2)}</span>
                </li>
                <li className="flex justify-between font-cabin text-lightgrey">
                  <span>Coupon Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </li>
              </ul>
              <div className="my-2 border border-solid"></div>
              <div className="gap-6 flex justify-between items-center text-red">
                <p className="text-xl">Order Total:</p>
                <p className="text-xl">${orderTotal.toFixed(2)}</p>
              </div>
              <div className="my-2 border border-solid"></div>
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg p-2 w-full mr-2"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-black text-white py-1 px-4 rounded-lg"
                >
                  Apply
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-black text-white py-1 px-4 rounded-lg w-full">
                  Place your order
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/bagItems"   // button link to move from one page to another
              className="bg-gray-900 px-4 text-white rounded-xl flex justify-center items-center gap-3"
            >
              <IoBagHandleOutline className="h-8" />
              View Bag
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bag;
