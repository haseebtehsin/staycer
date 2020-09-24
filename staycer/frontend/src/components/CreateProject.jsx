import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import withModal from "./common/withModal";

class CreateProject extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
      },
      positions: [],
      errors: {},
    };

    this.schema = {
      name: Joi.string().required().label("Name"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.doSubmit = this.doSubmit.bind(this);
  }

  doSubmit = async () => {
    const { data } = this.state;
    const { updateProjects } = this.props;
    try {
      const response = await http.post(apiEndPoints.projectsCollection(), data);
      if (response.status === 201) {
        console.log("project created");
        this.props.handleModalClose();
        updateProjects();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error creating project");
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
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
      <i className="fa fa-plus"> Create Project</i>
    </button>
  );
};

export default withModal(CreateProject, CreateButton, "Add Project");
