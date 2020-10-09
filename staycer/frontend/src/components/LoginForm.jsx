import React, { Component } from "react";
import Joi, { schema } from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import "./LoginForm.module.css";
import Spinner from "./common/Spinner";
class LoginForm extends Form {
  // state = {  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      errors: {},
      isLoading: false,
    };

    this.staycerLogoUrl = "/static/staycerLogoColored.png";
    this.schema = {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  doSubmit = async () => {
    const { email, password } = this.state.data;
    this.setState({ isLoading: true });
    const response = await auth.login(email, password);
    console.log(response);
    this.setState({ isLoading: false });
    if (response && response.status === 200) {
      console.log("login successful");
      window.location.hash = "/";
      window.location.reload();
    } else if (response && response.status === 400) {
      //   const errors = { ...this.state.errors };
      const loginErrorMessage = "Incorrect Credentials";
      const errors = { ...this.state.errors };
      errors.password = loginErrorMessage;
      this.setState({ errors });
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="d-flex  flex-column align-items-center mt-5">
        <div className="row mb-1">
          <div styleName="staycerLoginLogo">
            <img
              src={this.staycerLogoUrl}
              style={{ width: "100%", height: "100%" }}
            ></img>
          </div>
        </div>
        <div className="row mb-5">
          <div styleName="staycerLoginText">Staycer</div>
        </div>
        <div className="row">
          <div styleName="loginFormInput">
            <form onSubmit={this.handleSubmit} className="form-group mb-2">
              {this.renderInput("email", "Email", "email", "2")}
              {this.renderInput("password", "password", "password", "2")}
              {this.renderButton("Login")}
              <div className="mt-3">
                {isLoading ? <Spinner className="mt-2" /> : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
