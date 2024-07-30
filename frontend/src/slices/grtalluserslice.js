// src/redux/usersSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch("http://localhost:3005/user/alluser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                return rejectWithValue(error.message);
            }
            const data = await response.json();
            return data.users;
        } catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);
const usersSlice = createSlice({
    name: 'allusers',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});
export default usersSlice.reducer;