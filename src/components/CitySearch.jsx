import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [`${allLocations}`]); // react to prop changes

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setQuery(value);
        const filteredSuggestions = allLocations
            ? allLocations.filter(location => location.toUpperCase().indexOf(value.toUpperCase()) > -1)
            : [];
        setSuggestions(filteredSuggestions);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onChange={handleInputChanged}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map(suggestion => (
                        <li onClick={handleItemClicked} key={suggestion}>
                            {suggestion}
                        </li>
                    ))}
                    <li key="See all cities" onClick={handleItemClicked}><b>See all cities</b></li>
                </ul>
            )}
        </div>
    );
};

export default CitySearch;
