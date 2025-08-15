/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from '@/lib/axios';
import { ISeller, Pagination, SellerCompleteResponse } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface SellerState extends SellerCompleteResponse {
  loading: boolean;
  error: string | null;

}

const initialState: SellerState = {
  sellers: [],
  totalSellers: 0,
  activeSellers: 0,
  inactiveSellers: 0,
  testSellers: 0,
  percentageGrowthThisMonth: 0,
  newSellersThisMonth: 0,
  sellerGrowth: [],
  sellerGrowthByTypeThisMonth: {},
  loading: false,
  error: null,
  //@ts-ignore
  pagination: {
    hasNextPage: false,
    totalPages: 0,
    hasPrevPage: false,
    currentPage: 0,
    totalUsers: 0,
  },
};

export const fetchSellerStatistics = createAsyncThunk(
  'sellers/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<SellerCompleteResponse>('/statistics/sellers-stats');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch seller statistics');
    }
  }
);

export const fetchSellers = createAsyncThunk(
  'sellers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/statistics/sellers');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sellers');
    }
  }
);

const sellerSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSellerStatistics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSellerStatistics.fulfilled, (state, action) => {
      state.totalSellers = action.payload.totalSellers;
      state.activeSellers = action.payload.activeSellers;
      state.inactiveSellers = action.payload.inactiveSellers;
      state.testSellers = action.payload.testSellers;
      state.percentageGrowthThisMonth = action.payload.percentageGrowthThisMonth;
      state.newSellersThisMonth = action.payload.newSellersThisMonth;
      state.sellerGrowth = action.payload.sellerGrowth;
      state.sellerGrowthByTypeThisMonth = action.payload.sellerGrowthByTypeThisMonth;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.sellers = action.payload.sellers
    });
    builder.addCase(fetchSellerStatistics.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSellers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSellers.fulfilled, (state, action: PayloadAction<ISeller[]>) => {
      state.sellers = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSellers.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default sellerSlice.reducer;

