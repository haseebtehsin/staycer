import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Employee from "./Views/Employee/Employee";
import Certification from "./Views/Certification/Certification";
import Schedule from "./Views/Schedule/Schedule";
const ContentView = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/employees" component={Employee} />
        <Route path="/certification" component={Certification} />
        <Route path="/schedule" component={Schedule} />
        <Redirect to="/employees" />
      </Switch>
    </React.Fragment>
  );
};

export default ContentView;
