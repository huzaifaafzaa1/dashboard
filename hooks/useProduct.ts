"use client"
import API from '@/services/axiosInstance';
import { useQuery } from '@tanstack/react-query'

// Fetching function
const fetchProducts = async () => {
  const { data } = await API.get(`/products`);      // using axios instance
  return data;
};

// Custom hook using the correct useQuery syntax
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],   // Use queryKey inside an object
    queryFn: fetchProducts,   // Use queryFn for the fetching function
  });
};