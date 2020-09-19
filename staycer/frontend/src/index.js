import App from "../src/components/App";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import React from "react";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
