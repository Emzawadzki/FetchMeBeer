import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import "./styles/bootstrap-reboot.min.css";
import "./styles/bootstrap-grid.min.css";
import "./styles/styles.css";

import App from "./components/App";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);

serviceWorker.unregister();