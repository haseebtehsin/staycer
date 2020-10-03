import React, { Component } from "react";

import SideNavBar from "./SideNavBar/SideNavBar";
import TopBar from "./TopBar/TopBar";
import ContentView from "./ContentView";
import { ToastContainer } from "react-toastify";
//Should fix the following import error in the webpack
// import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer position="top-center" delay={2000} />
        <div className="row h-100">
          <div className="col-2 sideNavBar">
            <SideNavBar />
          </div>
          <div className="col-10 topRowContent">
            <div className="row">
              <TopBar />
            </div>
            <div className="mainContent">
              <ContentView />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
