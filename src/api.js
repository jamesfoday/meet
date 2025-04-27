import { mockData } from './mock-data';


export const getEvents = async () => {
    return mockData;
};

export const extractLocations = (events) => {
    const locations = events.map(event => event.location);
    const uniqueLocations = [...new Set(locations)];
    return uniqueLocations;
};
