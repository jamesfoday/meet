import React, { useState } from 'react';

function NumberOfEvents({ onNumberChange }) {
    const [eventCount, setEventCount] = useState(32);

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value, 10);
        setEventCount(value);

        if (onNumberChange) {
            onNumberChange(value);
        }
    };

    return (
        <div id="number-of-events">
            <label htmlFor="event-count">Number of events:</label>
            <input
                type="number"
                id="event-count"
                value={eventCount}
                onChange={handleInputChanged}
                role="textbox"
            />
        </div>
    );
}

export default NumberOfEvents;
