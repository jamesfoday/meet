import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;

        if (value === "") {
            setCurrentNOE("");
        } else if (!isNaN(parseInt(value, 10))) {
            setCurrentNOE(parseInt(value, 10));
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
