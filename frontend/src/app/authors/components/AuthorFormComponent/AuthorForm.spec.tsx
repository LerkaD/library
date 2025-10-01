import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AuthorFormView from './AuthorFormView';

describe('AuthorFormView', () => {
    let onSaveSpy: jasmine.Spy<(data: { name: string; birthdate: string }) => Promise<void>>;
    let onCancelSpy: jasmine.Spy<() => void>;

    beforeEach(() => {
        onSaveSpy = jasmine.createSpy('onSave').and.returnValue(Promise.resolve());
        onCancelSpy = jasmine.createSpy('onCancel');
    });

    it('Check that onsave called with correct data', async () => {
        render(<AuthorFormView show={true} onSave={onSaveSpy} onCancel={onCancelSpy} />);

        const nameInput = screen.getByPlaceholderText('Enter author name');
        const birthdateInput = screen.getByLabelText('Birthdate:');
        const saveButton = screen.getByText('Save');

        fireEvent.change(nameInput, { target: { value: 'New Author' } });
        fireEvent.change(birthdateInput, { target: { value: '2000-01-01' } });
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(onSaveSpy).toHaveBeenCalledWith({ name: 'New Author', birthdate: '2000-01-01' });
        });
    });
    it('check start data for edit', () => {
        render(
            <AuthorFormView
                show={true}
                onSave={onSaveSpy}
                onCancel={onCancelSpy}
                initialName="Test Author"
                initialBirthdate="2001-01-01"
                title="Edit author"
            />
        );

        const nameInput = screen.getByDisplayValue('Test Author');
        expect(nameInput).toBeTruthy();

        const birthdateInput = screen.getByDisplayValue('2001-01-01');
        expect(birthdateInput).toBeTruthy();

        const titleElement = screen.getByText('Edit author');
        expect(titleElement).toBeTruthy();
    });

    it('checkthat the edited data is transmitted for updating', async () => {
        render(
            <AuthorFormView
                show={true}
                onSave={onSaveSpy}
                onCancel={onCancelSpy}
                initialName="Test Author"
                initialBirthdate="2001-01-01"
                title="Edit author"
            />
        );

        const nameInput = screen.getByDisplayValue('Test Author');
        const birthdateInput = screen.getByDisplayValue('2001-01-01');
        const saveButton = screen.getByText('Save');

        fireEvent.change(nameInput, { target: { value: 'New Author' } });
        fireEvent.change(birthdateInput, { target: { value: '2000-10-01' } });

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(onSaveSpy).toHaveBeenCalledWith({ name: 'New Author', birthdate: '2000-10-01' });
        });

    });
});
