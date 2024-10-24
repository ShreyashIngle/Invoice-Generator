// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { AuthState } from '../../types';
// import { toast } from 'react-toastify';

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem('token'),
//   isLoading: false,
//   error: null,
// };

// export const register = createAsyncThunk(
//   'auth/register',
//   async (userData: { name: string; email: string; password: string }) => {
//     const response = await axios.post('http://localhost:5000/api/auth/register', userData);
//     return response.data;
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials: { email: string; password: string }) => {
//     const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
//     return response.data;
//   }
// );

// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (email: string) => {
//     const response = await axios.post('http://localhost:5000/api/password/forgot', { email });
//     return response.data;
//   }
// );
// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async ({ token, password }: { token: string; password: string }) => {
//     const response = await axios.post(`http://localhost:5000/api/password/reset/${token}`, { password });
//     return response.data;
//   }
// );


// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('token');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state) => {
//         state.isLoading = false;
//         toast.success('Registration successful! Please login.');
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Registration failed';
//         toast.error(state.error);
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         localStorage.setItem('token', action.payload.token);
//         toast.success('Login successful!');
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Login failed';
//         toast.error(state.error);
//       })
//       .addCase(forgotPassword.fulfilled, () => {
//         toast.success('Password reset link sent to your email');
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         toast.error(action.error.message || 'Failed to send reset link');
//       })
//       .addCase(resetPassword.fulfilled, () => {
//         toast.success('Password reset successful');
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         toast.error(action.error.message || 'Failed to reset password');
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Define more specific types
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordState {
  email: string;
  otpVerified: boolean;
}

const initialState: AuthState & ResetPasswordState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  email: '',
  otpVerified: false,
};
// Helper function to handle API errors
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || axiosError.message;
  }
  return 'An unexpected error occurred';
};

// Updated thunks with proper error handling and typing
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        'https://invoice-generator-kz6p.onrender.com/api/auth/register',
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        'https://invoice-generator-kz6p.onrender.com/api/auth/login',
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://invoice-generator-kz6p.onrender.com/api/password/forgot',
        { email }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://invoice-generator-kz6p.onrender.com/api/password/verify-otp',
        { email, otp }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, password }: { email: string; otp: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://invoice-generator-kz6p.onrender.com/api/password/reset',
        { email, otp, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        toast.success('Registration successful!');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Registration failed');
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Login failed');
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message || 'Password reset link sent to your email');
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Failed to send reset link');
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message || 'Password reset successful');
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || 'Failed to reset password');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 
