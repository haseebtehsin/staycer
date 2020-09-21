import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import withModal from "./common/withModal";

class CreateEmployee extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        firstName: "",
        lastName: "",
        position: undefined,
      },
      positions: [],
      errors: {},
    };

    this.schema = {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().required().label("Last Name"),
      position: Joi.string().required().label("position"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.doSubmit = this.doSubmit.bind(this);
  }

  doSubmit = async () => {
    const { updateEmployees } = this.props;
    const { data } = this.state;
    try {
      // TODO: Remove the hard code role. Hard coding role for now
      // TODO: Get company from the HR employee it self rather than
      // hardcoding
      // TODO: Remove the hard coded password and generate it on BE
      const userBasicDetails = {
        email: data.email,
        password: "Password@123",
        role: "WK",
        company: 1,
      };
      const userProfile = {
        first_name: data.firstName,
        last_name: data.lastName,
        position: data.position,
      };
      const newUserData = { ...userBasicDetails, profile: userProfile };
      const response = await http.post(
        apiEndPoints.usersCollection(),
        newUserData
      );
      if (response.status === 201) {
        console.log("employee created");
        updateEmployees();
        this.props.handleModalClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Email already exists";
        this.setState({ errors });
      }
    }
  };

  renderPositionsDropDown = () => {
    const { positions } = this.state;
    const POSITION = "position";
    return (
      <React.Fragment>
        <label htmlFor={POSITION}>Position</label>
        <select
          className="form-control"
          onChange={this.handleChange}
          error={POSITION}
          name={POSITION}
          label={POSITION}
        >
          <option value=""></option>
          {positions.map((position) => (
            <option key={position.name} value={position.id}>
              {position.name}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  };

  async componentDidMount() {
    const response = await http.get(apiEndPoints.positionsCollection());
    if (response.status === 200) {
      this.setState({ ...this.state, positions: response.data.results });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderPositionsDropDown()}
          {this.renderButton("Create")}
        </form>
      </div>
    );
  }
}

const CreateButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary rounded"
    >
      <i className="fa fa-plus"> Add Employee</i>
    </button>
  );
};

export default withModal(CreateEmployee, CreateButton, "Add Employee");
