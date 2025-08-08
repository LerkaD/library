import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import SearchInput from './SearchInputView';
import { act } from '@testing-library/react';

describe('SearchInput component ', () => {
    let container: HTMLDivElement;
    let root: Root;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        root.unmount();
        document.body.removeChild(container);
    });

    it('should render with placeholder', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');
        const placeholderText = 'Test placeholder...';

        // act - spec, that we mast wait render finish
        act(() => {
            root.render(
                <SearchInput
                    onSearch={mockOnSearch}
                    onSubmit={mockOnSubmit}
                    placeholder={placeholderText}
                />
            );
        });

        const input = container.querySelector('input[placeholder="Test placeholder..."]');
        expect(input).toBeTruthy();
    });
});