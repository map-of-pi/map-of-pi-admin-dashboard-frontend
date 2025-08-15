/* eslint-disable @typescript-eslint/no-explicit-any */



import axiosClient from "@/lib/axios";
import { CompleteResponse, IUser } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IUsersState extends CompleteResponse {

  isLoading: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  users:[],
  totalUsers:0,
  usersLast7Days:0,
  sevenDayPercentageChange:0,
  activeUsers:0,
  monthOverMonthPercentageChange:0,
  pagination:{
    hasNextPage:false,
    totalPages:0,
    totalReviews:0,
    hasPrevPage:false,
    currentPage:0,
    totalUsers:0,
  },
  isLoading: false,
  error: null,
};

export const fetchUsersStats = createAsyncThunk(
  "users/fetchUsersStats",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const response = await axiosClient.get<CompleteResponse>(`/statistics/users?page=${page}&limit=${limit}`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch users")
    }
  },
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalUsers = action.payload.totalUsers;
        state.pagination = action.payload.pagination;
        state.activeUsers  = action.payload.activeUsers;
        state.usersLast7Days = action.payload.usersLast7Days;
        state.sevenDayPercentageChange = action.payload.sevenDayPercentageChange;
        state.users = action.payload.users
        state.monthOverMonthPercentageChange = action.payload.monthOverMonthPercentageChange;
          
      })
      .addCase(fetchUsersStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const usersReducer = usersSlice.reducer;
