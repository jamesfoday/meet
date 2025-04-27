import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CitySearch from '../components/CitySearch';

const mockLocations = ["Berlin, Germany", "Munich, Germany", "Hamburg, Germany"];

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={mockLocations} onCitySelect={() => { }} />);
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestion list updates based on user input', () => {
        const cityTextBox = CitySearchComponent.getByRole('textbox');
        fireEvent.change(cityTextBox, { target: { value: 'Berlin' } });

        const suggestionItems = CitySearchComponent.getAllByRole('listitem');
        expect(suggestionItems.length).toBeGreaterThan(0);
        expect(suggestionItems[0]).toHaveTextContent('Berlin');
    });
});
