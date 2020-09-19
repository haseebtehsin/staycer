import React, { Component } from "react";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";
import EmployeeInfo from "./EmployeeInfo";
import CertificationLookUp from "../../Certifications/CertificationLookUp";
import "./EmployeeProfile.module.css";

import _ from "lodash";

class EmployeeProfile extends Component {
  state = { employee: {} };

  async fetchEmployee(employeeId) {
    let endpoint = new URL(apiEndPoints.usersResource(employeeId));
    endpoint.searchParams.append("expand", "profile");
    const response = await http.get(endpoint);
    return response.data;
  }

  updateEmployee = async (employeeId) => {
    const employee = await this.fetchEmployee(employeeId);
    this.setState({ employee: employee });
  };

  componentDidMount() {
    const { id: employeeId } = this.props.match.params;
    this.updateEmployee(employeeId);
  }

  updateEmployeePicture = (newPicture) => {
    const updatedEmployee = {
      ...this.state.employee,
      profile: { ...this.state.employee.profile, picture: newPicture },
    };
    this.setState({ ...this.state, employee: updatedEmployee });
  };

  render() {
    const { employee } = this.state;
    if (_.isEmpty(employee)) return null;
    return (
      <React.Fragment>
        <div styleName="employeeProfileComponent">
          <EmployeeInfo
            employee={employee}
            updateEmployeePicture={this.updateEmployeePicture}
            updateEmployee={() => {
              this.updateEmployee(employee.id);
            }}
          />
        </div>
        <div styleName="employeeProfileComponent">
          <CertificationLookUp employeeId={employee.id} />
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeProfile;
