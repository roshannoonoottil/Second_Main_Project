import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    Date: string;
    email: string;
    image: string;
    mobile: string;
    userName: string;
    _id: string;
}

interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: User;
    admin: User;
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    isAdmin: false,
    user: { Date: '', email: '', image: '', mobile: '', userName: '', _id: '' },
    admin: { Date: '', email: '', image: '', mobile: '', userName: '', _id: '' },
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = { ...initialState.user };
        },
        adminLogin: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.isAdmin = true;
            state.admin = action.payload;
        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.admin = { ...initialState.admin };
        },
    },
});

export const { login, logout, adminLogin, adminLogout } = authSlice.actions;
export default authSlice.reducer;
