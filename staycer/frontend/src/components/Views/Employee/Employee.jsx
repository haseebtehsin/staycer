import React, { Component } from "react";
import EmployeeMain from "./EmployeeMain";
import EmployeeProfile from "./EmployeeProfile";
import { Route, Switch } from "react-router-dom";

class Employee extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/employees/:id" component={EmployeeProfile} />
          <Route path="/employees" component={EmployeeMain} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Employee;
