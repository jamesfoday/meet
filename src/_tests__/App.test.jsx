import '@testing-library/jest-dom';
import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        const CitySearchDOM = container.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).getByRole('textbox');

        await user.type(CitySearchInput, 'Berlin');

        const berlinSuggestionItem = within(CitySearchDOM).getByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        const EventListDOM = container.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).getAllByRole('listitem');

        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
            (event) => event.location === 'Berlin, Germany'
        );

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);

        allRenderedEventItems.forEach((eventItem) => {
            expect(eventItem.textContent).toContain('Berlin, Germany');
        });
    });

    test('user can change the number of events displayed', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        const numberOfEventsInput = container.querySelector('#number-of-events input');

        await user.clear(numberOfEventsInput);
        await user.type(numberOfEventsInput, '10');

        const EventListDOM = container.querySelector('#event-list');
        const allEventListItems = within(EventListDOM).queryAllByRole('listitem');

        expect(allEventListItems.length).toBeLessThanOrEqual(10);
    });
});
