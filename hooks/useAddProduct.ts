"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/services/axiosInstance';

// Define a TypeScript interface for the product
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;  // Changed from imageUrl to image
  rating: {
    rate: number;  // Nested rating object
    count: number; // Count inside rating
  };
}


// Custom hook for adding products
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const addProduct = async (product: Product) => {
    const { data } = await API.post(`/products`, product);
    return data;
  };

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Refetch products after adding
    },
  });
};
