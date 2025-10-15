import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/app/basic_types'

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            // save user data in store
            state.user = action.payload.user;
            state.isAuthenticated = true
            state.isLoading = false
            localStorage.setItem('access_token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false
            localStorage.removeItem('access_token');
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        }
    }
})

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;