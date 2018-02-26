import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';

import App from './app';
import Routes from './routes';

import './index.html';



$(".dropdown-button").dropdown();

ReactDOM.render((
  <HashRouter>
    <section>
      <Routes />
    </section>
  </HashRouter>
), document.getElementById('root'));
