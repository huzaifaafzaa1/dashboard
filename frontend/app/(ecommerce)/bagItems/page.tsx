"use client"

import React from 'react'
import { MdStarHalf } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { increaseCount,decreaseCount } from '../../redux/bagSlice';
import { RootState } from '../../redux/store'; // Import RootState

const BagItems = () => {
 
  const dispatch = useDispatch();
  const bagProducts = useSelector((state:RootState)=>state.bag.bagProducts)     // state is set i dont need to dispatch it here

  return (
    <div className='w-[65%]  font-cabin '>
      <p className='text-4xl px-8 py-4 font-cabin'>Check your Bag Items</p>

      <div className=' flex flex-col justify-between gap-3 px-8 my-2 py-2 '>
        
        {bagProducts.map((bagproduct,index)=>{

        return <div key={index} className='flex gap-3 bg-white rounded-2xl py-4'>
            
            <div className='flex justify-center items-center '>
            <div className='h-44 w-44 flex justify-center items-center'>
              <img src={bagproduct.image} alt="" className='max-h-44 max-w-44 px-4'/>
            </div>
            </div>

            <div className=' px-3 py-3'>
              <h2 className='text-2xl font-cabin  py-1'>{bagproduct.title}</h2>
              <p className='py-1 text-darkgrey font-cabin'>{bagproduct.category}</p>
              <p className='py-1 font-cabin text-lg'>{bagproduct.description}</p>
              <div className='py-2 flex gap-3'>
              <ul className='flex items-center gap-1 text-darkgreen text-lg'>
              <li><MdStar /></li>
              <li><MdStar /></li>
              <li><MdStar /></li>
              <li><MdStar /></li>
              <li><MdStarHalf /></li>
              </ul>
              <p className='font-cabin text-green text-lg '>{bagproduct.rating.rate}/5</p>
              </div>     

              <div className='flex justify-between font-cabin'>
              <p className='font-cabin text-lg'>${bagproduct.price} × {bagproduct.count}</p>
              <div className='flex gap-3 justify-center items-center mx-5'>
                <button onClick={() => dispatch(decreaseCount(bagproduct._id))}><FaMinus className='text-red' /></button>
                <div>{bagproduct.count}</div>    {/* we have added count when we were fetching data so it is added to each product and now we can access it   */}
                <button  onClick={() => dispatch(increaseCount(bagproduct._id))}><FaPlus className='text-lightgreen'/></button>
              </div>
              </div>
            </div>
        </div>
        })} 

        

  
      </div>

    </div>
  )
}

export default BagItems
