import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  baseURL from "../../utils/baseUrl";


export const getAllNgos = createAsyncThunk(
  "ngos/getAllNgos",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${baseURL}/ngos`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const addNewService = createAsyncThunk(
  "ngos/addNewService",async ({ngo_name, ...serviceData}, {rejectWithValue, getState}) => {
    
    try {
      const response = await axios.post(`${baseURL}/ngos/${serviceData.ngo_id}/services`, serviceData);
     return response.data
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  })
const ngoSlice = createSlice({
    name: "ngos",
    initialState: {
        ngos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllNgos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllNgos.fulfilled, (state, action) => {
            state.ngos = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getAllNgos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch NGOs";
        })
        .addCase(addNewService.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addNewService.fulfilled, (state, action) => {
            state.ngos = action.payload?.data || state.ngos;
            state.loading = false;
            state.error = null;
        })
        .addCase(addNewService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to add service";
        });
    },
});

export default ngoSlice.reducer;