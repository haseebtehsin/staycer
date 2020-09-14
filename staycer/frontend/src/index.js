import App from "../src/components/App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
