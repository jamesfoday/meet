import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value)) {
            setCurrentNOE(value);
        }
    };

    return (
        <div id="number-of-events">
            <label htmlFor="event-count">Number of events:</label>
            <input
                type="number"
                id="event-count"
                value={currentNOE}
                onChange={handleInputChanged}
                role="textbox"
                min="1"
            />
        </div>
    );
};

export default NumberOfEvents;
