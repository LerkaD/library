import { configureStore } from "@reduxjs/toolkit";
import themeSlice from './themeSlice';
import buttonSlice from './buttonSlice'
const store = configureStore({
    reducer: {
        themeSwitcher: themeSlice,
        buttonClick: buttonSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;