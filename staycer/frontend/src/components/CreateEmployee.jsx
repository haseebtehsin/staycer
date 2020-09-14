import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import withModal from "./common/withModal";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

class CreateEmployee extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        first_name: "",
        last_name: "",
        email: "",
      },
      errors: {},
    };

    this.schema = {
      first_name: Joi.string().required().label("First Name"),
      last_name: Joi.string().required().label("Last Name"),
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
      const response = await http.post(apiEndPoints.usersCollection(), {
        email: this.state.data.email,
        password: "Password@123",
        first_name: this.state.data.first_name,
        last_name: this.state.data.last_name,
        company: 1,
      });
      console.log(response);
      if (response.status === 201) {
        toast("User Successfully Created");
        this.props.handleModalClose();
        console.log("Created");
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
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("first_name", "First Name")}
          {this.renderInput("last_name", "Last Name")}
          {this.renderButton("Create")}
        </form>
      </div>
    );
  }
}

export default withModal(CreateEmployee, "Create New Employee");
