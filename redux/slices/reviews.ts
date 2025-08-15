/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from '@/lib/axios';
import { ExtendedUser, IReviewFeedback, Pagination, } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ICompleteReviewResponse {
  totalReviews: number;
  mostReviewedUser: {
    user: { id: string; name: string } | null;
    count: number;
  };
  currentMonthReviews: number;
  currentMonthReviewPercentage: number;
  negativeReviews: number;
  mostReviewsReceived: ExtendedUser[];
  mostReviewsGiven: ExtendedUser[];
  mostTrustworthyReviewsReceived: ExtendedUser[];
  mostTrustworthyReviewsGiven: ExtendedUser[];
  mostDespairReviewsReceived: ExtendedUser[];
  mostDespairReviewsGiven: ExtendedUser[];
  pagination: Pagination;
}

export interface IMappedReviiew  {
  id: string,
  reviewer:string,
  seller:string,
  rating: number,
  comment: string,
  date:string,
}

interface IReviewState extends ICompleteReviewResponse {
  reviews: IMappedReviiew[];
  loading: boolean;
  error: string | null;
}

const initialState: IReviewState = {
  reviews: [],
  loading: false,
  error: null,
  totalReviews: 0,
  mostReviewedUser: {
    user: null,
    count: 0
  },
  currentMonthReviews: 0,
  currentMonthReviewPercentage: 0,
  negativeReviews: 0,
  mostReviewsReceived: [],
  mostReviewsGiven: [],
  mostTrustworthyReviewsReceived: [],
  mostTrustworthyReviewsGiven: [],
  mostDespairReviewsReceived: [],
  mostDespairReviewsGiven: [],
  pagination:{
    hasNextPage:false,
    totalPages:0,
    hasPrevPage:false,
    currentPage:0,
    totalReviews:0,
    totalUsers:0,
  },
};

export const fetchReviewStatistics = createAsyncThunk(
  'review/fetchReviewStatistics',
  async ({ page, limit }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/statistics/review-stats?page=${page}&limit=${limit}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch review statistics'
      );
    }
  }
);


export const fetchTopUserReviewStats = createAsyncThunk(
  'review/fetchTopUserReviewStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<ICompleteReviewResponse>('/statistics/top-reviewer-stats');
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch top reviewer stats'
      );
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopUserReviewStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchTopUserReviewStats.fulfilled,
      (state, action) => {
      state.loading = false;
      state.error = null;
      state.mostReviewsReceived = action.payload.mostReviewsReceived;
      state.mostReviewsGiven = action.payload.mostReviewsGiven;
      state.mostTrustworthyReviewsReceived = action.payload.mostTrustworthyReviewsReceived;
      state.mostTrustworthyReviewsGiven = action.payload.mostTrustworthyReviewsGiven;
      state.mostDespairReviewsReceived = action.payload.mostDespairReviewsReceived;
      state.mostDespairReviewsGiven = action.payload.mostDespairReviewsGiven;
      }
    );
    builder.addCase(fetchTopUserReviewStats.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchReviewStatistics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReviewStatistics.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.reviews = action.payload.reviews
      state.totalReviews = action.payload.totalReviews;
      state.mostReviewedUser =  action.payload.mostReviewedUser
      state.currentMonthReviews =  action.payload.currentMonthReviews
      state.currentMonthReviewPercentage = action.payload.currentMonthReviewPercentage;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchReviewStatistics.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default reviewSlice.reducer;
