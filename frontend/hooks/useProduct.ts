"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, addProduct, removeProduct, updateProduct, fetchProductById } from '@/services/productService';
import { toast } from 'sonner'; // Import toast

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

  // Fetch all products using useQuery
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Fetch a single product by ID using useQuery
  const useProductQuery = (id: string | null) => {
    return useQuery<Product>({
      queryKey: ['product', id],
      queryFn: async () => {
        if (!id) throw new Error('Product ID is required');
        return fetchProductById(id);
      },
      enabled: !!id,
    });
  };

  // Add product using useMutation
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product successfully added!'); // Toast success message
    },
    onError: (error: Error) => {
      console.error('Error adding product:', error);
      toast.error('Failed to add product. Please try again.'); // Toast error message
    },
  });

  // Update product using useMutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: Product }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product successfully updated!'); // Toast success message
    },
    onError: () => {
      toast.error('Failed to update product.'); // Toast error message
    },
  });

  // Remove product using useMutation
  const removeProductMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product successfully removed!'); // Toast success message
    },
    onError: () => {
      toast.error('Failed to remove product.'); // Toast error message
    },
  });

  return {
    productsQuery,
    useProductQuery,
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
