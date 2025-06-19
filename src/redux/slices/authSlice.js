import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseUrl";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${baseURL}/auth/login`, userData);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
);
const user = localStorage.getItem("user");
const initialState = {
    user: user ? JSON.parse(user) : null,
    isLoading: false,
    error: null,
    isAuthenticated: !!user,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action?.payload?.data));
                state.isLoading = false;
                state.user = action?.payload?.data;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;