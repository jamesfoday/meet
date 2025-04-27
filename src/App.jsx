import React, { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      setEvents(allEvents);
      setLocations(allLocations);
      setFilteredEvents(allEvents); // Show all events initially
    }
    fetchData();
  }, []);

  const handleCitySelect = (city) => {
    const cityEvents = city === 'See all cities'
      ? events
      : events.filter((event) => event.location === city);

    setFilteredEvents(cityEvents);
  };

  return (
    <div className="App">
      <CitySearch allLocations={locations} onCitySelect={handleCitySelect} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export default App;
