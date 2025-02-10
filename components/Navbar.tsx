import React from 'react';
import { IoMenu, IoHome } from "react-icons/io5";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Link from 'next/link';

const Navbar = () => {

  // Menu array to store navbar items
  const menuItems = [
    { icon: <img src="logo.png" alt="Logo" className="h-6 max-w-6" />, text: 'Logo', href: null },
    { icon: <IoMenu className=" h-6 w-6" />, text: 'Menu', href: null },
    { icon: <IoHome className="h-6 w-6" />, text: 'Home', href: '/ecommerce' },
    { icon: <RiShoppingBag4Fill className="h-6 w-6" />, text: 'Bag', href: '/ecommerce/bagItems' },
  ];

  return (
    <div className='nav-parent w-44 '>
    <nav className="navbar group sticky top-0 left-0 bg-white flex flex-col items-center justify-between w-16 h-[625px] rounded-xl mx-2 my-2 transition-all duration-300 ease-in-out hover:w-36">
      <ul className="flex flex-col gap-7 my-5 justify-center items-center">
        {menuItems.map((item, index) => (
          <li key={index} className="h-6 w-6 flex justify-center items-center group-hover:w-full">
            {item.href ? (
              <Link
                href={item.href}
                className="text-black py-1 px-1 hover:bg-black hover:text-white hover:rounded-md flex items-center gap-2">
                {item.icon}
                <span className="hidden group-hover:block">{item.text}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="hidden group-hover:block">{item.text}</span>
              </div>
            )}
          </li>
        ))}
      </ul>

      
        <div className="flex gap-2 justify-center items-center">
          <div className='bg-red px-1 py-1 my-6 rounded-md h-6 w-6 flex justify-center items-center '><FiLogOut className="max-h-6 max-w-6 text-white" /></div>
          <div className="hidden group-hover:block text-black font-cabin">Log Out</div>
        </div>
        
    </nav>
    </div>
  );
};

export default Navbar;
