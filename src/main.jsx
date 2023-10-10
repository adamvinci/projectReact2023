import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import './style/main.css'


import AppLoader from './App/AppLoader';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppLoader />
    </React.StrictMode>,
)