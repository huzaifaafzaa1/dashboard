export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  export interface BagProduct extends Product {
    count: number; // Add count to BagProduct
  }
  