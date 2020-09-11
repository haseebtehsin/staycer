import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import axios from "axios";
axios.interceptors.response.use(null, (error) => {
  const unexpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!unexpectedError) {
    console.log("Logging the error", error);
    alert("An unexpected error occured");
  }

  return Promise.reject(error);
});

const apiHost = "http://127.0.0.1:8000/";
const userEndPoint = "api/v1/users/";

class CreateUser extends Form {
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
    // const { data } = this.state;
    console.log(this.state.data);

    try {
      const response = await axios.post(userEndPoint, {
        email: this.state.data.email,
        password: "Password@123",
        first_name: this.state.data.first_name,
        last_name: this.state.data.last_name,
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
    console.log(this.state.errors);
    return (
      <div>
        <h3>Create User</h3>
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

export default CreateUser;
