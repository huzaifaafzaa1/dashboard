import API from '@/lib/axiosInstance';

// Define the Product interface
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

// Fetch all products
export const fetchProducts = async () => {
  const { data } = await API.get('/products');
  return data;
};

// Add a new product
export const addProduct = async (product: Product) => {
  const { data } = await API.post('/products', product);
  return data;
};

// Update an existing product by ID
export const updateProduct = async (id: string, product: Product) => {
  const { data } = await API.put(`/products/${id}`, product);
  return data;
};

// Remove a product by ID
export const removeProduct = async (id: string) => {
  await API.delete(`/products/${id}`);
};
