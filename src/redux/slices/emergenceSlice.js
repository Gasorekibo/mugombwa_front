import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import  baseURL from "../../utils/baseUrl";

export const getAllEmergenciesContact = createAsyncThunk(
    'emergencies/getAllEmergenciesContact',
    async (_, {rejectWithValue}) => {
        try {
        const response = await axios.get(`${baseURL}/emergency-contacts`);
        return response.data;
        } catch (error) {
        if (!error.response) {
            throw error;
        } else {
            if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
        }
        }
    }
)

const emergenceSlice = createSlice({
    name: 'emergencies',
    initialState: {
        emergencies: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmergenciesContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllEmergenciesContact.fulfilled, (state, action) => {
                state.emergencies = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllEmergenciesContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch emergencies';
            });
    },
})

export default emergenceSlice.reducer;