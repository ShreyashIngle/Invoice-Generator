import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductState, Product } from '../../types';

// Initial state of the product slice
const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

// Async thunk to add a product
export const addProduct = createAsyncThunk(
  'product/add',
  async (product: Omit<Product, 'id'>, { getState }) => {
    const state: any = getState();
    const token = state.auth.token;

    if (!token) {
      throw new Error('Authorization token is missing');
    }

   

    try {
      const response = await axios.post('http://localhost:5000/api/products', product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // Check if the error is an Axios error
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to add product');
      }
      throw new Error('Failed to add product');
    }
  }
);

// Async thunk to generate an invoice
export const generateInvoice = createAsyncThunk(
  'product/generateInvoice',
  async (products: Product[], { getState }) => {
    const state: any = getState();
    const token = state.auth.token;

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    console.log('Authorization token:', token); // Log the token for debugging

    try {
      const response = await axios.post(
        'http://localhost:5000/api/invoices',
        { products },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to generate invoice');
      }
      throw new Error('Failed to generate invoice');
    }
  }
);

// Product slice definition
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to add product';
      })
      .addCase(generateInvoice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateInvoice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(generateInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to generate invoice';
      });
  },
});

// Export actions and reducer
export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
