"use client"

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setProducts } from "../app/redux/productsSlice";
import { addToBag } from "../app/redux/bagSlice";
import { selectBagProducts, selectProducts} from "../app/redux/selector";
import ProductCard from "./ProductCard";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Product, BagProduct } from "../app/redux/type"; // Import BagProduct type from type.ts
import API from "@/services/axiosInstance";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const bagProducts = useSelector(selectBagProducts);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const API_URL = "/products"; // Only the endpoint since baseURL is already set in axios.tsx

  
    async function fetchData() {
      try {
        let response = await API.get(API_URL); // Using the configured Axios instance
        let data: Product[] = response.data;  // Explicitly defining the type  
    
        // Adding custom properties to the fakestore API data
        const updatedData: BagProduct[] = data.map((product) => ({
          ...product,
          count: 0, // Now the product has a 'count' field
        }));
        dispatch(setProducts(updatedData)); // Now it's within the try block, so no error
      } 
      catch (error) {
        console.error(error);
      }
    }
  

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm("");
    localStorage.removeItem("searchTerm");
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }

    fetchData();     

  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="productContainer flex flex-col items-center w-[73%] ">
      {/* search container */}
      <div className="searchcontainer w-1/2 mx-auto my-5 p-2">
        <label className="text-darkgrey font-cabin">Search Item</label>
        <div className="relative">
          <input
            className="search w-full px-3 py-2 rounded-lg bg-white"
            type="text"
            placeholder="Apple Watch, Samsung S21, Macbook Pro,..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div
              className="absolute right-2 top-0 bottom-0 flex items-center justify-center "
              onClick={handleClearSearch}
            >
              <MdOutlineCancelPresentation className="text-gray-500 text-3xl cursor-pointer p-1 rounded-full hover:bg-gray-200" />
            </div>
          )}
        </div>
      </div>

      {/* products */}
      <div className="flex justify-center items-center w-[95%] my-4">
        <div className="products grid grid-cols-4 gap-4 justify-center items-center w-full">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`ecommerce/${product.id}`}>
              <ProductCard
                product={product}
                bagProducts={bagProducts}
                dispatch={dispatch}
                addToBag={addToBag}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
