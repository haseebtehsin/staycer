import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProjectLookUp from "../../ProjectLookUp/ProjectLookUp";
import ProjectDetails from "./ProjectDetails";

const Project = () => {
  return (
    <React.Fragment>
      <div className="generalComponentDiv">
        <Switch>
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/project" component={ProjectLookUp} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Project;
