export interface Rating {
  rate: number;
  count: number;
}

export interface Category {
  _id: string;
  name: string;
  products: string[]; // Add this if the API provides it
}

export interface Product {
  _id?: string;
  title: string;
  price: number;
  description: string;
  category: Category; // Update to use the Category interface
  image: string;
  rating: Rating;
}

export interface BagProduct extends Product {
  count: number; // Add count to BagProduct
}