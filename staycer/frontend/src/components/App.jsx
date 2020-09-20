import React, { Component } from "react";
import Employee from "./Views/Employee/Employee";
import SideNavBar from "./SideNavBar/SideNavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Certification from "./Views/Certification/Certification";
import "./App.css";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-3">
              <SideNavBar />
            </div>
            <div className="col-9">
              <Switch>
                <Route path="/employees" component={Employee} />
                <Route path="/certification" component={Certification} />
                <Route path="/schedule" />
                <Redirect to="/employees" />
              </Switch>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
