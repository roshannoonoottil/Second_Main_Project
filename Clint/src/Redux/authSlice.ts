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
            state.isAdmin = false; // Ensure it's a user login, not admin
            state.user = action.payload;
            state.admin = { ...initialState.admin }; // Reset admin data
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.user = { ...initialState.user };
            state.admin = { ...initialState.admin }; // Reset admin on user logout
        },
        adminLogin: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.isAdmin = true;
            state.admin = action.payload;
            state.user = { ...initialState.user }; // Reset user data
        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.admin = { ...initialState.admin };
            state.user = { ...initialState.user }; // Reset user on admin logout
        },
    },
});

export const { login, logout, adminLogin, adminLogout } = authSlice.actions;
export default authSlice.reducer;
