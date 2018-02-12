import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import './index.html'


$(".dropdown-button").dropdown()

ReactDOM.render(<App />, document.getElementById('root'));
