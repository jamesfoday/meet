import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import { act } from 'react';
import userEvent from '@testing-library/user-event';



jest.mock('../api');

describe('Integration test: App + CitySearch + EventList', () => {
    test('renders events matching the city selected by user', async () => {
        getEvents.mockResolvedValue([
            { id: 1, title: 'Event 1 in Berlin - Berlin, Germany', location: 'Berlin, Germany' },
            { id: 2, title: 'Event 2 in Berlin - Berlin, Germany', location: 'Berlin, Germany' },

        ]);

        render(<App />);

        const cityInput = await screen.findByPlaceholderText('Search for a city');

        await act(async () => {
            await userEvent.type(cityInput, 'Berlin');
        });

        const suggestionItems = await screen.findAllByRole('listitem');
        await act(async () => {
            await userEvent.click(suggestionItems[0]); // click "Berlin, Germany"
        });


        const eventItems = await waitFor(() => screen.getAllByRole('listitem'));


        expect(eventItems.length).toBeGreaterThan(0);
        eventItems.forEach((item) => {
            expect(item.textContent).toMatch(/Berlin/i);
        });
    });
});
