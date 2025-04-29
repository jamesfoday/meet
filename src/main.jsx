import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import * as atatus from 'atatus-spa';
atatus.config('55d8a5110d4f4a349dc65149ea4afdcb').install();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
