import API from '@/lib/axiosInstance';

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

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await API.get('/products');
  return data;
};

// Fetch a single product by ID
export const fetchProductById = async (_id: string): Promise<Product> => {
  const { data } = await API.get(`/products/${_id}`);
  return data;
};

// Add a new product
export const addProduct = async (product: Omit<Product, '_id'>): Promise<Product> => {
  const { data } = await API.post('/products', product);
  return data;
};

// Update an existing product by ID
export const updateProduct = async (_id: string, product: Partial<Product>): Promise<Product> => {
  const { data } = await API.put(`/products/${_id}`, product);
  return data;
};

// Remove a product by ID
export const removeProduct = async (_id: string): Promise<void> => {
  await API.delete(`/products/${_id}`);
};