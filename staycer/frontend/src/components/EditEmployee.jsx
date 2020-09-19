import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import withModal from "./common/withModal";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import _ from "lodash";

class EmployeeEdit extends Form {
  constructor(props) {
    super(props);
    const { employee } = props;
    this.state = {
      data: {
        first_name: employee.profile.first_name,
        last_name: employee.profile.last_name,
        phone: employee.profile.phone,
      },
      errors: {},
    };

    this.schema = {
      first_name: Joi.string().label("First Name"),
      last_name: Joi.string().label("Last Name"),
      phone: Joi.string().label("Phone"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.doSubmit = this.doSubmit.bind(this);
  }

  doSubmit = async () => {
    const { employee, updateEmployee, handleModalClose } = this.props;
    const { data } = this.state;
    const updatedProfile = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
    };
    try {
      const response = await http.patch(
        apiEndPoints.usersProfileResource(employee.id),
        updatedProfile
      );

      if (response.status === 200) {
        console.log("emloyee updated");
        updateEmployee();
        handleModalClose();
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("first_name", "First Name")}
          {this.renderInput("last_name", "Last Name")}
          {this.renderInput("phone", "phone", "tel")}
          {this.renderButton("Update")}
        </form>
      </div>
    );
  }
}
const EditButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary rounded"
    >
      <i className="fa fa-edit"> Edit </i>
    </button>
  );
};

export default withModal(EmployeeEdit, EditButton, "Edit Employee");
