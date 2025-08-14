import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInputView';

describe('SearchInput component', () => {
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

    it('check placeholder', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');
        const placeholderText = 'Test placeholder';

        act(() => {
            root.render(
                <SearchInput
                    onSearch={mockOnSearch}
                    onSubmit={mockOnSubmit}
                    placeholder={placeholderText}
                />
            );
        });

        const input = container.querySelector(`input[placeholder="${placeholderText}"]`);
        expect(input).toBeTruthy();
    });

    it('check calling onSearch during text input', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');

        act(() => {
            root.render(<SearchInput onSearch={mockOnSearch} onSubmit={mockOnSubmit} />);
        });

        const input = container.querySelector('input')!;

        act(() => {
            fireEvent.change(input, { target: { value: 'test' } });
        });

        expect(mockOnSearch).toHaveBeenCalledWith('test');
    });

    it('check calling onSubmit', () => {
        const mockOnSearch = jasmine.createSpy('onSearch');
        const mockOnSubmit = jasmine.createSpy('onSubmit');

        act(() => {
            root.render(<SearchInput onSearch={mockOnSearch} onSubmit={mockOnSubmit} />);
        });

        const input = container.querySelector('input')!;
        const form = container.querySelector('form')!;

        act(() => {
            fireEvent.change(input, { target: { value: 'submit' } });
        });
        act(() => {
            fireEvent.submit(form);
        });

        expect(mockOnSubmit).toHaveBeenCalledWith('submit');
    });

    it('check Search button with submit type', () => {
        act(() => {
            root.render(
                <SearchInput onSearch={jasmine.createSpy()} onSubmit={jasmine.createSpy()} />
            );
        });

        const button = container.querySelector('button');
        expect(button).toBeTruthy();
        expect(button?.getAttribute('type')).toBe('submit');
    });
    it('check Search button with label -search-', () => {
        act(() => {
            root.render(
                <SearchInput onSearch={jasmine.createSpy()} onSubmit={jasmine.createSpy()} />
            );
        });

        const button = container.querySelector('button');
        expect(button).toBeTruthy();
        expect(button?.textContent).toBe('Search');
    });
});
