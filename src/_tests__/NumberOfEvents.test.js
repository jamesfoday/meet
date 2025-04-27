import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import React from 'react';

describe('<NumberOfEvents /> component', () => {
    test('renders input textbox correctly', () => {
        render(<NumberOfEvents />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        render(<NumberOfEvents />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue(32);
    });

    test('changes number of events when user types', async () => {
        const user = userEvent.setup();
        render(<NumberOfEvents />);
        const input = screen.getByRole('textbox');

        await user.clear(input); // Clear the default 32
        await user.type(input, '10');

        expect(input).toHaveValue(10);
    });

    test('calls onNumberChange prop when input changes', async () => {
        const user = userEvent.setup();
        const onNumberChange = jest.fn();
        render(<NumberOfEvents onNumberChange={onNumberChange} />);
        const input = screen.getByRole('textbox');

        await user.clear(input);
        await user.type(input, '15');

        expect(onNumberChange).toHaveBeenCalled();
        expect(onNumberChange).toHaveBeenCalledWith(15);
    });
});
