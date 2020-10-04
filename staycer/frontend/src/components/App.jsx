import React, { Component } from "react";

import { ToastContainer } from "react-toastify";
//Should fix the following import error in the webpack
// import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer position="top-center" delay={2000} />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
