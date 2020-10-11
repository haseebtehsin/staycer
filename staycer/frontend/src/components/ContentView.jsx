import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Employee from "./Views/Employee/Employee";
import Certification from "./Views/Certification/Certification";
import Schedule from "./Views/Schedule/Schedule";
import Dashboard from "./Views/Dashboard/Dashboard";
import Project from "./Views/Project/Project";
const ContentView = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/employees" component={Employee} />
        <Route path="/certification" component={Certification} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/project" component={Project} />
        <Redirect to="/dashboard" />
      </Switch>
    </React.Fragment>
  );
};

export default ContentView;
