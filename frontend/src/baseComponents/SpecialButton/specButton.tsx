'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleButtonText } from '@/store/buttonSlice';

const SpecialButton = () => {
    const dispatch = useDispatch();
    const buttonText = useSelector((state: RootState) => state.buttonClick.buttonText);

    return (
        <button
            className="btn btn-primary"
            onClick={() => dispatch(toggleButtonText())}
        >
            {buttonText}
        </button>
    );
};

export default SpecialButton;