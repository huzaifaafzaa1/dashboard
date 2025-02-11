"use client";
import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProduct';
import { useRemoveProduct } from '@/hooks/useRemoveProduct';  // Import the new hook
import { MoreVertical } from "lucide-react";
import Link from 'next/link';

const AllProducts = () => {
  const { data: products, error, isLoading } = useProducts();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { mutate: removeProduct } = useRemoveProduct();  // Destructure mutate function

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (id: string) => {
    // console.log(`Edit product with ID: ${id}`);
    // Add your edit functionality here
  };

  const handleRemove = (id: string) => { // when i click on remove button the id of the product get passed to handleremove
    removeProduct(id);  // Call the mutation to remove the product
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            
            {/* Three-dot menu */}
            <button
              onClick={() => toggleMenu(product.id)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>

            {/* Dropdown menu */}
            {openMenuId === product.id && (
              <div className="absolute top-10 right-2 bg-white border rounded-lg shadow-lg w-32 z-10">
               {/*  Inside your product rendering code: */}
               <Link href={`/dashboard/edit/${product.id}`}>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
               </Link>

                <button
                  onClick={() => handleRemove(product.id)}  // Trigger remove here
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="p-4">
              <div className="bg-gray-100 p-4 rounded-xl flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-40 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
