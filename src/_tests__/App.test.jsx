import '@testing-library/jest-dom';
import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

// describe('<App /> component', () => {

// });

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
            event => event.location === 'Berlin, Germany'
        );

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);

        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain('Berlin, Germany');
        });
    });

    test('user can change the number of events displayed', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const numberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        const numberInput = within(numberOfEventsDOM).queryByRole('textbox');

        await user.clear(numberInput);
        await user.type(numberInput, '10');

        const eventListDOM = AppDOM.querySelector('#event-list');
        const allEventListItems = within(eventListDOM).queryAllByRole('listitem');

        expect(allEventListItems.length).toBeLessThanOrEqual(10);
    });

});
