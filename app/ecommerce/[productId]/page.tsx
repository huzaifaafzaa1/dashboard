"use client";
import React from 'react';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";
import { MdStarHalf } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { addToBag } from '../../redux/bagSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'next/navigation';

// Define types for Product and Redux state
type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

type ReduxState = {
  bag: {
    bagProducts: Product[];
  };
  productsStore: {
    products: Product[];
  };
};

const ProductDescription = () => {
  const dispatch = useDispatch();
  
  // Access Redux state with types
  const bagProducts = useSelector((state: ReduxState) => state.bag.bagProducts);
  const { productId } = useParams();

  // Find the product from the store based on productId
  const product = useSelector((state: ReduxState) => 
    state.productsStore.products.find((item) => item.id === Number(productId))
  );

  // If no product is found, return a fallback message
  if (!product) {
    return <p>No product selected. Please go back and select a product.</p>;
  }

  return (
    <div className='w-[65%] font-cabin '>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div><Link href="/ecommerce" className='flex gap-2 items-center my-5 py-2 px-3'>
        <IoIosArrowBack />Back</Link>
      </div>

      <div className=''>
        <div className='flex gap-3 '>
          <div className='flex gap-4 justify-center ml-3'>
            <div className='flex flex-col items-center gap-2'>
              <div className='h-14 w-14 bg-white flex justify-center items-center rounded-xl py-2 px-2'>
                <img src={product.image} alt="" className='max-h-14 max-w-14 py-2 px-2 '/>
              </div>
              <div className='h-14 w-14 bg-white flex justify-center items-center rounded-xl'>
                <img src={product.image} alt="" className='max-h-14 max-w-14 py-2 px-2'/>
              </div>
              <div className='h-14 w-14 bg-white flex justify-center items-center rounded-xl'>
                <img src={product.image} alt="" className='max-h-14 max-w-14 py-2 px-2'/>
              </div>
            </div>

            <div className='h-60 w-56 bg-white flex justify-center items-center rounded-xl'>
              <img src={product.image} alt="" className='max-h-56 max-w-52 py-4 px-2 '/>
            </div>
          </div>

          <div className=''>
            <h1 className='font-bold text-4xl px-4'>{product.title}</h1>
            <h2 className=' text-2xl px-4 py-1 text-darkgrey'>{product.category}</h2>
            <div className='px-4 py-2 flex gap-3'>
              <ul className='flex items-center gap-1 text-darkgreen text-lg'>
                <li><MdStar /></li>
                <li><MdStar /></li>
                <li><MdStar /></li>
                <li><MdStar /></li>
                <li><MdStarHalf /></li>
              </ul>
              <p className='text-green text-lg'>{product.rating.rate}</p>
            </div>
            <h2 className=' text-2xl px-4 py-2 font-semibold font-cabin'>$ {product.price}</h2>
            <p className='px-4 font-cabin text-lg'>{product.description}</p>
          </div>

        </div>

        <div className='flex px-8 my-2 justify-end'>
          <button
            className='bg-gray-900 text-white px-4 py-1 rounded-2xl flex justify-center items-center gap-3'
            onClick={() => {
              // Check if the product is already in the bag
              const existingProduct = bagProducts.find((item) => item.id === product.id);
              if (existingProduct) {
                toast.error("This product is already in your bag!");
              } else {
                dispatch(addToBag({ ...product, count: 1 }));
                toast.success("Product added to your bag!");
              }
            }}
          >
            <IoBagAddOutline />Add to bag
          </button>
        </div>
      </div>

      <div className='border mt-2  border-lightgrey rounded-md '></div>

      <div className=' mb-4'>
        <h2 className='text-2xl font-semibold px-4 py-2 font-cabin'>Description</h2>
        <p className='px-4'>{product.description}</p>
      </div>

    </div>
  );
}

export default ProductDescription;
