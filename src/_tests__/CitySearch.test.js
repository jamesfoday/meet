import '@testing-library/jest-dom';
import React from 'react';
import { render, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

const mockLocations = ["Berlin, Germany", "Munich, Germany", "Hamburg, Germany"];

describe('<CitySearch /> component', () => {
    let CitySearchComponent;

    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={mockLocations} setCurrentCity={() => { }} />);
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestion list updates based on user input', () => {
        const cityTextBox = CitySearchComponent.getByRole('textbox');

        fireEvent.focus(cityTextBox);
        fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

        const suggestionItems = CitySearchComponent.getAllByRole('listitem');
        expect(suggestionItems.length).toBeGreaterThan(0);
        expect(suggestionItems[0]).toHaveTextContent('Berlin');
    });


    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        await waitFor(() => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems.length).toBe(allLocations.length + 1);
        });
    });
});
