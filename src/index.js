import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from "mobx-react";
import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));