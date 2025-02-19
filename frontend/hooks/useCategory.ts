"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import { fetchCategories, addCategory } from '@/services/categoryService'; 

interface Category {
  _id: string; // Make _id required
  name: string;
  products: string[];
}

export const useCategories = () => {
  const { data: categories = [], isLoading, isError, error } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const queryClient = useQueryClient();

  const createCategory = useMutation<Category, Error, Omit<Category, '_id'>>({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (err: Error) => {
      console.error('Error adding category:', err.message);
    },
  });

  return {
    categories,
    loading: isLoading,
    error: isError ? error : null,
    createCategory: createCategory.mutate,
  };
};
