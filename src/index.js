import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

import App from './components/App';

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ), document.getElementById('app')
);
