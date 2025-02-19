import API from '@/lib/axiosInstance';
import { Category } from '@/type/type';


// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await API.get('/categories');             //here we are getting data from the api
  return data;
};

// Add a new category
export const addCategory = async (category: Omit<Category, '_id'>): Promise<Category> => {
  const { data } = await API.post('/categories', category);
  return data;
};
