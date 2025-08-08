// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type ThemeState = {
//     mode: 'light' | 'dark';
// };

// const initialState: ThemeState = {
//     mode: 'light',
// };

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         toggleTheme: (state) => {
//             state.mode = state.mode === 'light' ? 'dark' : 'light';
//         },
//         setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
//             state.mode = action.payload;
//         },
//     },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;
// export default themeSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        return (saved as 'light' | 'dark') || 'light';
    }
    return 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: getInitialTheme(),
    },
    reducers: {
        setTheme: (state, action: { payload: 'light' | 'dark' }) => {
            state.mode = action.payload;
            localStorage.setItem('theme', action.payload);
            document.cookie = `theme=${action.payload}; path=/; max-age=31536000`;
            document.documentElement.setAttribute('data-bs-theme', action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;