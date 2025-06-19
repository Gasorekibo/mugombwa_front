import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseUrl";

export const getAllAnnouncements = createAsyncThunk(
  "announcements/getAllAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/announcements`);
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

export const createAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (announcementData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/announcements`, announcementData);
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

const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    announcements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch announcements";
      })
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.announcements?.data?.push(action?.payload?.data);
        state.loading = false;
        state.error = null;
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create announcement";
      });
  },
});
export default announcementSlice.reducer;