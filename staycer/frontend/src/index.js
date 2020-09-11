import App from "../src/components/App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
