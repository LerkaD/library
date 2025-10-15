import { configureStore } from "@reduxjs/toolkit";
import themeSlice from './themeSlice';
import buttonSlice from './buttonSlice'
import authSlice from './authSlice'

const store = configureStore({
    reducer: {
        themeSwitcher: themeSlice,
        buttonClick: buttonSlice,
        authCheker: authSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;