import React, { Component } from "react";
import Employee from "./Views/Employee/Employee";
import SideNavBar from "./SideNavBar/SideNavBar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row ">
          <div className="col-3">
            <SideNavBar />
          </div>
          <div className="col-9">
            <Switch>
              <Route path="/employees" component={Employee} />
              <Route path="/schedule" />
              <Route path="/projects" />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
