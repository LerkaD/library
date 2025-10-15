import { createSlice } from '@reduxjs/toolkit';

const getStoredTheme = (): 'light' | 'dark' => {
    console.log('start getStoredTheme')
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('savedTheme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            console.log('stored theme:', savedTheme)
            return savedTheme;
        } else {
            localStorage.setItem('savedTheme', 'light');
            return 'light';
        }
    }
    return 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: getStoredTheme(),
        isThemeLoaded: false,
    },
    reducers: {
        setTheme: (state, action: { payload: 'light' | 'dark' }) => {
            state.mode = action.payload;
            state.isThemeLoaded = true;
            if (typeof window !== 'undefined') {
                localStorage.setItem('savedTheme', action.payload);
                document.documentElement.setAttribute('data-bs-theme', action.payload);
            }
        },
        markThemeLoaded: (state) => {
            state.isThemeLoaded = true;
        }
    },
});


export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
export { getStoredTheme };