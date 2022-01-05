import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomButton from './CustomButton';

test('Render custom primary button', () => {
    render(<CustomButton variant="primary">Click</CustomButton>);
    expect(screen.getByText('Click')).toBeInTheDocument();
});

test('Render custom default button', () => {
    render(<CustomButton variant="default">Click</CustomButton>);
    expect(screen.getByText('Click')).toBeInTheDocument();
});

test('Render custom clear button', () => {
    render(<CustomButton variant="clear">Click</CustomButton>);
    expect(screen.getByText('Click')).toBeInTheDocument();
});
