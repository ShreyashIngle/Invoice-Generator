export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  name: string;
  quantity: number;
  rate: number;
  total: number;
  gst: number;
}

export interface Invoice {
  id: string;
  user: User;
  products: Product[];
  date: string;
  totalAmount: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}