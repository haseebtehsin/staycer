import React, { Component } from "react";

import SideNavBar from "./SideNavBar/SideNavBar";
import TopBar from "./TopBar/TopBar";
import ContentView from "./ContentView";
// import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="row ">
            <div className="col-3 sideNavBar">
              <SideNavBar />
            </div>
            <div className="col-9 topRowContent">
              <div className="row">
                <TopBar />
              </div>
              <div className="mainContent">
                <ContentView />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
