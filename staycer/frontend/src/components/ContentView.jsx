import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Employee from "./Views/Employee/Employee";
import Certification from "./Views/Certification/Certification";
const ContentView = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/employees" component={Employee} />
        <Route path="/certification" component={Certification} />
        <Route path="/schedule" />
        <Redirect to="/employees" />
      </Switch>
    </React.Fragment>
  );
};

export default ContentView;
