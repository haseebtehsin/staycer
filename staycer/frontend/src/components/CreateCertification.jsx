import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import PropTypes from "prop-types";
import withModal from "./common/withModal";

class CreateCertification extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        issueDate: undefined,
        expiryDate: undefined,
        validated: false,
        certificate: "",
        picture: null,
      },
      certificates: [],
      errors: {},
    };

    //TODO: Make sure on FE that expiry date is greater
    // than the issue date
    this.schema = {
      issueDate: Joi.date().required(),
      expiryDate: Joi.date().required(),
      validated: Joi.boolean().required(),
      certificate: Joi.string().min(0).required(),
      picture: Joi.string().allow(null),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const response = await http.get(apiEndPoints.certificatesCollection());
    if (response.status === 200) {
      this.setState({ ...this.state, certificates: response.data.results });
    }
  }

  doSubmit = async () => {
    const { updateCertifications, handleModalClose } = this.props;
    const { data, pictureFile } = this.state;
    let newCertificationData = {
      issue_date: data.issueDate,
      expiry_date: data.expiryDate,
      validated: data.validated,
      certificate: parseInt(data.certificate),
    };
    if (pictureFile) {
      const formData = new FormData();
      formData.append("picture", pictureFile);
      Object.keys(newCertificationData).forEach(function (key) {
        formData.append(key, newCertificationData[key]);
      });
      newCertificationData = formData;
    }

    const { employeeId } = this.props;
    try {
      const response = await http.post(
        apiEndPoints.userCertificationCollection(employeeId),
        newCertificationData
      );
      if (response.status === 201) {
        console.log("cert created");
        updateCertifications();
        handleModalClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("error creating cert");
        // const errors = { ...this.state.errors };
        // errors.email = "Email already exists";
        // this.setState({ errors });
      }
    }
  };

  renderCertificatesDropDown = () => {
    const { certificates } = this.state;
    return (
      <React.Fragment>
        <label htmlFor="certificate">Certificate</label>
        <select
          className="form-control"
          onChange={this.handleChange}
          error="certificate"
          name="certificate"
          label="certificate"
        >
          <option value=""></option>
          {certificates.map((certificate) => (
            <option key={certificate.name} value={certificate.id}>
              {certificate.name}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("issueDate", "Issue Date", "date")}
          {this.renderInput("expiryDate", "Expiry Date", "date")}
          {this.renderInput("validated", "Validated", "checkbox")}
          {this.renderCertificatesDropDown()}
          {this.renderInput("picture", "Picture", "file")}
          {this.renderButton("Create")}
        </form>
      </div>
    );
  }
}
CreateCertification.propTypes = {
  employeeId: PropTypes.number.isRequired,
};

const CreateButton = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary rounded"
    >
      <i className="fa fa-plus"> Add</i>
    </button>
  );
};

export default withModal(
  CreateCertification,
  CreateButton,
  "Add Certification"
);
