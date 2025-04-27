import React, { useState } from 'react';

const CitySearch = ({ allLocations, onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setQuery(value);

        const filteredSuggestions = allLocations
            ? allLocations.filter((city) =>
                city.toUpperCase().includes(value.toUpperCase())
            )
            : [];
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        onCitySelect(value);
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={handleItemClicked}>
                            {suggestion}
                        </li>
                    ))}
                    {/* Only show "See all cities" if suggestions exist */}
                    {suggestions.length > 0 && (
                        <li key="See all cities" onClick={handleItemClicked}>
                            <b>See all cities</b>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CitySearch;
