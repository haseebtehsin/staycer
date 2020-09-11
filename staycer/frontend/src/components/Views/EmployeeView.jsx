import EmployeeLookup from "../EmployeeLookUp/EmployeeLookUp";
import React, { Component } from "react";
import CreateUser from "../CreateUser";

class EmployeeView extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <CreateUser />
        </div>
        <div className="row">
          <EmployeeLookup />;
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeView;
