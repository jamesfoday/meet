import { mockData } from './mock-data';


export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");

        if (!code) {
            const response = await fetch("https://bhp1laje7g.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }

        return code && getToken(code);
    }

    return accessToken;
};


const checkToken = async (accessToken) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
    const result = await response.json();
    return result;
};

// Get events with offline fallback using localStorage
export const getEvents = async () => {
    // If local dev environment, use mock data only
    if (window.location.href.startsWith('http://localhost')) {
        return mockData;
    }


    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        console.log("Offline mode: Loading events from localStorage.");
        return events ? JSON.parse(events) : [];
    }


    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = `https://bhp1laje7g.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {

            localStorage.setItem("lastEvents", JSON.stringify(result.events));
            return result.events;
        } else return null;
    }
};


const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.pushState("", "", newurl);
    } else {
        newurl = `${window.location.protocol}//${window.location.host}`;
        window.history.pushState("", "", newurl);
    }
};


const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(`https://bhp1laje7g.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`);
    const { access_token } = await response.json();
    if (access_token) localStorage.setItem("access_token", access_token);
    return access_token;
};


export const extractLocations = (events) => {
    const locations = events.map(event => event.location);
    const uniqueLocations = [...new Set(locations)];
    return uniqueLocations;
};
