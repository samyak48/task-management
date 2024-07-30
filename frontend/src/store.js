import { Tuple, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userslice'
import { thunk } from 'redux-thunk'
import taskslice from './slices/taskslice'
import allUserReducer from './slices/grtalluserslice'
import statusReducer from './slices/statusslice'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Only persist the 'user' slice of state
    // blacklist: ['tasks'], // Alternatively, you can use blacklist to exclude certain slices from being persisted
};
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        // user: userReducer,
        user: persistedUserReducer,
        tasks: taskslice,
        allusers: allUserReducer,
        status: statusReducer
    },
    middleware: () => new Tuple(thunk, logger)
})
export const persistor = persistStore(store);
export default store