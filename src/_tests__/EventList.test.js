import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
    let renderResult;

    beforeEach(() => {
        renderResult = render(<EventList events={[]} />);
    });

    test('has an element with "list" role', () => {
        expect(renderResult.queryByRole("list")).toBeInTheDocument();
    });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents();
        renderResult.rerender(<EventList events={allEvents} />);

        expect(renderResult.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});
