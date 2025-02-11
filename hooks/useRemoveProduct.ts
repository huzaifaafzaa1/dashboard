"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/services/axiosInstance';

// Custom hook for removing products
export const useRemoveProduct = () => {
  const queryClient = useQueryClient();

  const removeProduct = async (id: string) => {
    await API.delete(`/products/${id}`);  // Assuming RESTful API deletes using product ID
  };

  return useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });  // Refetch products after deletion
    },
  });
};
