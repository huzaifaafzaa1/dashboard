"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, addProduct, removeProduct, updateProduct, fetchProductById } from '@/services/productService';
import { toast } from 'sonner'; // Import toast

// Update the Product interface in your custom hook and service function
interface Product {
  _id?: string; // Make _id optional
  title: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
  }; // Change to an object with _id and name
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
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
  const useProductQuery = (_id: string | null) => {
    return useQuery<Product>({
      queryKey: ['product', _id],
      queryFn: async () => {
        if (!_id) throw new Error('Product ID is required');
        return fetchProductById(_id);
      },
      enabled: !!_id,
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
