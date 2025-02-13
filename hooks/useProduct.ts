"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, addProduct, removeProduct, updateProduct } from '@/services/productService';       //importing services function

// Define a TypeScript interface for the product
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Main custom hook combining all functionalities
export const useProduct = () => {
  const queryClient = useQueryClient();

  // Fetch products using useQuery
  const productsQuery = useQuery({
    queryKey: ['products'],         
    queryFn: fetchProducts,           // using function from services
  });

  // Add product using useMutation
  const addProductMutation = useMutation({
    mutationFn: addProduct,          // using function from services
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Update product using useMutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: Product }) => updateProduct(id, product),   // using function from services
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Remove product using useMutation
  const removeProductMutation = useMutation({
    mutationFn: removeProduct,      // using function from services
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    productsQuery,
    addProductMutation,
    updateProductMutation,
    removeProductMutation,
  };
};


/////////////////////////////////////////////////
//code without services functions
// "use client";
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import API from '@/lib/axiosInstance';

// // Define a TypeScript interface for the product
// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;  
//   rating: {
//     rate: number;  
//     count: number;
//   };
// }

// // Fetch Products
// const fetchProducts = async () => {
//   const { data } = await API.get(`/products`);
//   return data;
// };

// // Main custom hook combining all functionalities
// export const useProduct = () => {
//   const queryClient = useQueryClient();

//   // Fetch products using useQuery
//   const productsQuery = useQuery({
//     queryKey: ['products'],
//     queryFn: fetchProducts,        //calling the fetch function here
//   });

//   // Add product using useMutation
//   const addProductMutation = useMutation({
//     mutationFn: async (product: Product) => {
//       const { data } = await API.post(`/products`, product);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   // Remove product using useMutation
//   const removeProductMutation = useMutation({
//     mutationFn: async (id: string) => {
//       await API.delete(`/products/${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });

//   return {
//     productsQuery,          // For fetching products
//     addProductMutation,     // For adding products
//     removeProductMutation,  // For removing products
//   };
// };
