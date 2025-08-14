import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ButtonState {
    buttonText: string;
}

const initialState: ButtonState = {
    buttonText: "Click!",
};

const buttonSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        setButtonText: (state, action: PayloadAction<string>) => {
            state.buttonText = action.payload;
        },
        toggleButtonText: (state) => {
            state.buttonText = state.buttonText === "Click!"
                ? "OK, one more!"
                : "Click!";
        }
    },
});

export const { setButtonText, toggleButtonText } = buttonSlice.actions;
export default buttonSlice.reducer;