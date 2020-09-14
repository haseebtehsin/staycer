import React, { Component } from "react";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";
import EmployeeInfo from "./EmployeeInfo";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeCertifications from "./EmployeeCertifications";
import _ from "lodash";

class EmployeeProfile extends Component {
  state = { employee: {}, isEdit: false };

  // constructor(props) {
  //   super(props);
  //   const id = props.match.params.id;
  //   this.state.id = id;
  // }

  async fetchEmployee(employeeId) {
    let endpoint = new URL(apiEndPoints.usersResource(employeeId));
    endpoint.searchParams.append("expand", "profile");
    const response = await http.get(endpoint);
    return response.data;
  }

  async componentDidMount() {
    const { id: employeeId } = this.props.match.params;
    const employee = await this.fetchEmployee(employeeId);
    this.setState({ employee: employee });
  }

  updateEmployee = (updatedEmployee) => {
    this.setState({ ...this.state, employee: updatedEmployee });
  };

  setEdit = (isEdit) => {
    this.setState({ ...this.state, isEdit: isEdit });
  };

  onFileUpload = (event) => {
    const { employee } = this.props;
    // Create an object of formData
    const formData = new FormData();
  };

  updateEmployeePicture = (newPicture) => {
    const updatedEmployee = {
      ...this.state.employee,
      profile: { ...this.state.employee.profile, picture: newPicture },
    };
    this.setState({ ...this.state, employee: updatedEmployee });
  };

  render() {
    const { employee, isEdit } = this.state;
    if (_.isEmpty(employee)) return null;
    return (
      <React.Fragment>
        {isEdit ? (
          <EmployeeEdit employee={employee} setEdit={this.setEdit} />
        ) : (
          <EmployeeInfo
            employee={employee}
            setEdit={this.setEdit}
            updateEmployeePicture={this.updateEmployeePicture}
          />
        )}
        {<EmployeeCertifications employeeId={employee.id} />}
      </React.Fragment>
    );
  }
}

export default EmployeeProfile;
