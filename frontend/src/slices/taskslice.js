import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


export const fetchAllTasks = createAsyncThunk(
    'tasks/fetchAllTasks',
    async (step, { rejectWithValue }) => { // jo locha ave to _,step mukjo
        try {
            const response = await fetch(`http://localhost:3005/task/getalltask?page=${step}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const data = await response.json();
            // console.log(data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3005/task/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const result = await response.json();
            // console.log(result)
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }

);


export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3005/task/deletetask/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const result = await response.json();
            console.log(result)
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (taskData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3005/task/updatetask/${taskData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    })

export const fetchUserTasks = createAsyncThunk(
    'tasks/fetchUserTasks',
    async (step, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3005/user/getmytasks?page=${step}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const data = await response.json();
            return data.tasks;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateUserTaskStatus = createAsyncThunk(
    'tasks/updateUserTaskStatus',
    async ({ id, status }, { rejectWithValue }) => {
        console.log(status)
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3005/task/updatetaskstatus/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: status })
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateUserTaskStatusPending = createAsyncThunk(
    'tasks/updateUserTaskStatus',
    async (id, { rejectWithValue }) => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3005/task/updatetaskstatus/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "pending" })
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }
            const result = await response.json();
            // console.log(result)
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload.data;
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
                toast.success("Task added successfully");
            })
            .addCase(addTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload.message);
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload._id)
                // state.tasks = state.tasks.filter(task => task._id !== action.payload._id);
                toast.success("Task deleted successfully");
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // console.log(action.payload._id)
                // state.tasks = state.tasks.map(task => task._id === action.payload._id ? action.payload : task);
                toast.success("Task updated successfully");
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload.message);
            })
            .addCase(fetchUserTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchUserTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserTaskStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserTaskStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserTaskStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.tasks = state.tasks.map(task => task._id === action.payload._id ? action.payload : task);
                toast.success("Task status updated successfully");
            })

    }
});

export default tasksSlice.reducer;
