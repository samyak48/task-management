import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialStateUser = {
    user: null,
    status: 'idle',
    error: null
};


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3005/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const result = await response.json();
                return rejectWithValue(result.message);  //aa vady
            }

            const result = await response.json();
            localStorage.setItem('token', result.token);
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3005/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const result = await response.json();
                return rejectWithValue(result.message);
            }
            const result = await response.json();
            localStorage.setItem('token', result.token);
            toast.success("Successfully registered");
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState: initialStateUser,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.data.user;
                toast.success("Successfully logged in");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload);  //aa vadu
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                toast.success("user created successfully")
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload);
            });
    }
});
export default userSlice.reducer