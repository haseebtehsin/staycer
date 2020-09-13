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
    const response = await http.get(apiEndPoints.usersResource(employeeId));
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

  render() {
    const { employee, isEdit } = this.state;
    if (_.isEmpty(employee)) return null;
    return (
      <React.Fragment>
        {isEdit ? (
          <EmployeeEdit
            employee={employee}
            setEdit={this.setEdit}
            updateEmployee={this.updateEmployee}
          />
        ) : (
          <EmployeeInfo employee={employee} setEdit={this.setEdit} />
        )}
        {<EmployeeCertifications employeeId={employee.id} />}
      </React.Fragment>
    );
  }
}

export default EmployeeProfile;
