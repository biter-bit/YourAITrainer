import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import './css/main.css';
import './css/model.css';
import './css/articlePage.css';


const app = ReactDOMClient.createRoot(document.getElementById('root'))
app.render(<App />)
