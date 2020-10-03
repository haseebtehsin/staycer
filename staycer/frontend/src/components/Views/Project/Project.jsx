import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProjectLookUp from "../../ProjectLookUp/ProjectLookUp";
import ProjectScheduLookUp from "../../ProjectScheduleLookUp/ProjectScheduleLookUp";

const Project = () => {
  return (
    <React.Fragment>
      <div className="generalComponentDiv">
        <Switch>
          <Route path="/project/:id" component={ProjectScheduLookUp} />
          <Route path="/project" component={ProjectLookUp} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Project;
