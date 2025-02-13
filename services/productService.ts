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
export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await API.get('/products');
  return data;
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

// Add a new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data } = await API.post('/products', product);
  return data;
};

// Update an existing product by ID
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const { data } = await API.put(`/products/${id}`, product);
  return data;
};

// Remove a product by ID
export const removeProduct = async (id: string): Promise<void> => {
  await API.delete(`/products/${id}`);
};