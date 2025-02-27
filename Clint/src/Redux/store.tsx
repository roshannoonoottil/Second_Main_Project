import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

// Combine reducers (for scalability)
const rootReducer = combineReducers({
    auth: authReducer, // ✅ Ensures 'auth' exists in the state
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // ✅ Persist only 'auth' reducer
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE'
                ],
            },
        }),
});

// Infer types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
