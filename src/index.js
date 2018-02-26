import React from "react";
import ReactDOM from "react-dom";

import { HashRouter } from "react-router-dom";

import Routes from "./routes";

import "./index.html";



$(".dropdown-button").dropdown();// eslint-disable-line

ReactDOM.render((
  <HashRouter>
    <section>
      <Routes />
    </section>
  </HashRouter>
), document.getElementById("root"));
