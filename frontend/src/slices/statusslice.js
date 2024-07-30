// src/redux/tasksSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const fetchStatus = createAsyncThunk(
    'tasks/fetchStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3005/task/alltaskstatus", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                return rejectWithValue(error.message);
            }
            const data = await response.json();

            return data;

        } catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMyStatus = createAsyncThunk(
    'tasks/fetchMyStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3005/task/mytaskstatus", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                return rejectWithValue(error.message);
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchMyStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMyStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchMyStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default statusSlice.reducer;