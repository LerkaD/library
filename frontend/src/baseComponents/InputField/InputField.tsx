import React from 'react';
import { Form } from 'react-bootstrap';

type InputFieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
};

export function InputField({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false,
    autoFocus = false,
}: InputFieldProps) {
    return (
        <Form.Group className="author-create-form-group">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                autoFocus={autoFocus}
            />
        </Form.Group>
    );
}