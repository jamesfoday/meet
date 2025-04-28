import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    test('renders a textbox input element', () => {
        render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => { }} />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => { }} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue(32);
    });

    test('user can change number of events', async () => {
        const user = userEvent.setup();
        let numberOfEvents = 32;
        const setCurrentNOE = (value) => {
            numberOfEvents = value;
        };

        render(<NumberOfEvents currentNOE={numberOfEvents} setCurrentNOE={setCurrentNOE} />);

        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, '10');


        expect(input).toHaveValue(10);
    });

});
