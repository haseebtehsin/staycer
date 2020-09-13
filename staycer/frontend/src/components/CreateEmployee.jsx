import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";

class CreateEmployee extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
      },
      errors: {},
    };

    this.schema = {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.doSubmit = this.doSubmit.bind(this);
  }

  doSubmit = async () => {
    try {
      // TODO: Remove the hard code role. Hard coding role for now
      // TODO: Get company from the HR employee it self rather than
      // hardcoding
      // TODO: Remove the hard coded password and generate it on BE
      const response = await http.post(apiEndPoints.usersCollection(), {
        email: this.state.data.email,
        password: "Password@123",
        role: "WK",
        company: 1,
      });
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
        <h3>Create User</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderButton("Create")}
        </form>
      </div>
    );
  }
}

export default CreateEmployee;
