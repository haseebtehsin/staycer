import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
// import { Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import withModal from "./common/withModal";
import "./CreateEmployee.module.css";

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
        console.log("Employee Created");
        updateEmployees();
        this.props.handleModalClose();
        toast.success("Employee added", { autoClose: 2000 });
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
    // const { positions } = this.state;
    // // const TRADE = "position";
    // const positionOptions = positions.map((position) => ({
    //   key: position.id,
    //   value: position.id,
    //   text: position.name,
    // }));
    // positionOptions.unshift({ key: "", value: "", text: "" });
    // return (
    //   <React.Fragment>
    //     <Dropdown
    //       placeholder="Select Trade"
    //       fluid
    //       search
    //       selection
    //       options={positionOptions}
    //       onChange={(e, data) => {
    //         this.handleChange(e);
    //       }}
    //     />
    //   </React.Fragment>
    // );

    const { positions } = this.state;
    const POSITION = "position";
    return (
      <React.Fragment>
        <div className="form-group row">
          <label htmlFor={POSITION} className="col-4 col-form-label">
            Position
          </label>
          <div className="col-8">
            <select
              className="form-control"
              onChange={(e, data) => {
                this.handleChange(e);
              }}
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
          </div>
        </div>
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
        <form onSubmit={this.handleSubmit} className="form-group mb-2">
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
    <div styleName="createEmployeeButton">
      <button
        onClick={handleClick}
        type="button"
        className="btn btn-primary rounded"
      >
        <i className="fa fa-plus"> Add Employee</i>
      </button>
    </div>
  );
};

export default withModal(CreateEmployee, CreateButton, "Add Employee");
