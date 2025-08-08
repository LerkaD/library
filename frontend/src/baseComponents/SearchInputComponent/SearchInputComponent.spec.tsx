import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInputView';

describe('SearchInput component: ', () => {
    it('check renders SearchInput component with placeholder', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');
        const placeholderText = 'Test placeholder...';

        render(
            <SearchInput
                onSearch={mockOnSearch}
                onSubmit={mockOnSubmit}
                placeholder={placeholderText}
            />
        );

        const input = screen.getByPlaceholderText(placeholderText);
        expect(input).toBeDefined();
    });

    it('check updating input value', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');
        const placeholderText = 'Test placeholder...';

        render(
            <SearchInput
                onSearch={mockOnSearch}
                onSubmit={mockOnSubmit}
                placeholder={placeholderText}
            />
        );

        const input = screen.getByPlaceholderText(placeholderText);

        fireEvent.change(input, { target: { value: 'New value' } });
        expect((input as HTMLInputElement).value).toBe('New value');
        expect(mockOnSearch).toHaveBeenCalledWith('New value');
    });

    it('check submit seacrh button', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');
        const placeholderText = 'Test placeholder...';

        render(
            <SearchInput
                onSearch={mockOnSearch}
                onSubmit={mockOnSubmit}
                placeholder={placeholderText}
            />
        );
        const input = screen.getByPlaceholderText(placeholderText);

        fireEvent.change(input, { target: { value: 'New value' } });

        const form = screen.getByRole('button');
        fireEvent.submit(form)

        expect(mockOnSubmit).toHaveBeenCalledWith('New value');
    });


});
