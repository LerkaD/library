import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: 'light',
    },
    reducers: {
        setTheme: (state, action: { payload: 'light' | 'dark' }) => {
            state.mode = action.payload;
            if (typeof window !== 'undefined') {
                document.documentElement.setAttribute('data-bs-theme', action.payload);
            }
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
