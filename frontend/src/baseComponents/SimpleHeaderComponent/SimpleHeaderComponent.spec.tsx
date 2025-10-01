import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from '@testing-library/react';
import HeaderComponent from './SimpleHeaderComponent';

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

    it('check component label rendering', () => {
        const testTitle = 'Test title'
        const testOnButtonClick = jasmine.createSpy('bntClick')
        const testButtonText = 'Test Button text'

        act(() => {
            root.render(
                <HeaderComponent
                    title={testTitle}
                    onButtonClick={testOnButtonClick}
                    buttonText={testButtonText}
                />
            )
        })
        const button = container.querySelector(`button`);
        expect(button).toBeTruthy();
        expect(button?.textContent).toBe(`${testButtonText}`);

        const checked_title = container.querySelector(`h1`);
        expect(checked_title).toBeTruthy();
        expect(checked_title?.textContent).toBe(`${testTitle}`);
    })

})