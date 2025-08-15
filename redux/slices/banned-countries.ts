/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from '@/lib/axios';
import { IBannedCountry, IBannedCountriesState } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: IBannedCountriesState = {
  countries: [],
  loading: false,
  error: null,
};

export const fetchBannedCountries = createAsyncThunk(
  'bannedCountries/fetchBannedCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('/statistics/banned-countries');
      // The API returns { restrictedAreas: [...] }
      return response.data.restrictedAreas as IBannedCountry[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch banned countries'
      );
    }
  }
);

const bannedCountriesSlice = createSlice({
  name: 'bannedCountries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBannedCountries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBannedCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.countries = action.payload;
    });
    builder.addCase(fetchBannedCountries.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default bannedCountriesSlice.reducer; 