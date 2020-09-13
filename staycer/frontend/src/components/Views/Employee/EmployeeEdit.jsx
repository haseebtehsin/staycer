import React, { Component } from "react";
import Form from "../../common/form";
import Joi, { schema } from "joi-browser";
import http from "../../../services/httpService";
import apiEndPoints from "../../../config/apiEndPoints";
import _ from "lodash";

class EmployeeEdit extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        first_name: props.employee.first_name,
        last_name: props.employee.last_name,
      },
      errors: {},
    };

    this.schema = {
      first_name: Joi.string().label("First Name"),
      last_name: Joi.string().label("Last Name"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.doSubmit = this.doSubmit.bind(this);
  }

  doSubmit = async () => {
    const { employee } = this.props;
    const updatedEmployee = {
      first_name: this.state.data.first_name,
      last_name: this.state.data.last_name,
      company: 1,
    };
    try {
      const response = await http.patch(
        apiEndPoints.usersResource(employee.id),
        updatedEmployee
      );
      if (response.status === 200) {
        this.props.updateEmployee(_.merge(employee, updatedEmployee));
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Email already exists";
        this.setState({ errors });
      }
    }
  };

  render() {
    const { employee, setEdit } = this.props;
    return (
      <div>
        <h3>Update User</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("first_name", "First Name", employee.first_name)}
          {this.renderInput("last_name", "Last Name", employee.last_name)}
          {this.renderButton("Update")}
        </form>
        <button
          onClick={() => setEdit(false)}
          type="button"
          className="btn btn-info"
        >
          Back to Profile
        </button>
      </div>
    );
  }
}
export default EmployeeEdit;
