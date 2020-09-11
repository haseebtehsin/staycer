import EmployeeLookup from "../../EmployeeLookUp/EmployeeLookUp";
import React, { Component } from "react";
import CreateEmployee from "../../CreateEmployee";

class EmployeeMain extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <CreateEmployee />
        </div>
        <div className="row">
          <EmployeeLookup />
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeMain;
