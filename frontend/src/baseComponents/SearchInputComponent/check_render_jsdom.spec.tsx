import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from './SearchInputView';

describe('SearchInput component with existing JSDOM', () => {
    it('should render with placeholder', () => {
        const { getByPlaceholderText } = render(
            <SearchInput
                onSearch={jasmine.createSpy()}
                onSubmit={jasmine.createSpy()}
                placeholder="Test placeholder..."
            />
        );

        expect(getByPlaceholderText('Test placeholder...')).toBeTruthy();
    });
});