/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/lib/axios";
import { IAdmin } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IRootAuth {
  currentUser: IAdmin | null;
  isLoading: boolean;
  error: string;
}

const initialState: IRootAuth = {
  currentUser: null,
  isLoading: false,
  error: "",
};


export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/admin/login`, credentials);
        return {
            token: response.data.token,
            admin: response.data.admin
      };
    } catch (error:any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/admin/register`, credentials);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "auth/admin/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/admin/me`);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action: { payload: IAdmin }) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    logout(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
          state.currentUser = action.payload.admin;
        localStorage.setItem("token",action.payload.token)
        state.isLoading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUserInfo.fulfilled, (state,action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
