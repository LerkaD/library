import { createSlice } from '@reduxjs/toolkit';

const getStoredValue = () => {
    console.log('Getting stored value')
    if (typeof window !== 'undefined') {
        const savedCount = localStorage.getItem('savedCount');
        if (savedCount) {
            return Number(savedCount);
        } else {
            localStorage.setItem('savedCount', '0');
            return 0;
        }
    }
    return 0;
};

const buttonSlice = createSlice({
    name: 'counter',
    initialState: {
        value: getStoredValue()
    },
    reducers: {
        setValueIncrement: (state) => {
            state.value += 1;
            if (typeof window !== 'undefined') {
                localStorage.setItem('savedCount', state.value.toString());
            }
        },
        setValueDecrement: (state) => {
            state.value -= 1;
            if (typeof window !== 'undefined') {
                localStorage.setItem('savedCount', state.value.toString());
            }
        },
    },
});


export const { setValueIncrement, setValueDecrement } = buttonSlice.actions;

export default buttonSlice.reducer;
export { getStoredValue };


