import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import { toast } from "react-toastify";

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
        certificate: undefined,
        picture: undefined,
      },
      certificates: [],
      institutes: [],
      errors: {},
    };

    //TODO: Make sure on FE that expiry date is greater
    // than the issue date
    this.schema = {
      issueDate: Joi.date().required(),
      expiryDate: Joi.date().required(),
      certificate: Joi.string(),
      picture: Joi.string().allow(null),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const response = await http.get(apiEndPoints.institutesCollection());
    if (response.status === 200) {
      this.setState({ ...this.state, institutes: response.data.results });
    }
  }

  doSubmit = async () => {
    const { updateCertifications, handleModalClose } = this.props;
    const { data, pictureFile } = this.state;
    let newCertificationData = {
      issue_date: data.issueDate,
      expiry_date: data.expiryDate,
      certificate: parseInt(data.certificate),
    };
    if (pictureFile) {
      const formData = new FormData();
      formData.append("picture", pictureFile);
      Object.keys(newCertificationData).forEach(function (key) {
        formData.append(key, newCertificationData[key]);
      });
      newCertificationData = formData;
    } else {
      newCertificationData.picture = null;
    }

    const { employeeId } = this.props;
    try {
      const response = await http.post(
        apiEndPoints.userCertificationCollection(employeeId),
        newCertificationData
      );
      if (response.status === 201) {
        console.log("cert created");
        handleModalClose();
        updateCertifications();
        toast.success("Certification Added", { autoClose: 2000 });
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
        <div className="form-group row">
          <label htmlFor="certificate" className="col-4 col-form-label">
            Certificate
          </label>
          <div className="col-8">
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
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleInstituteChange = async (e) => {
    const instituteId = e.target.value;
    const response = await http.get(
      apiEndPoints.instituteCertificatesCollection(instituteId)
    );
    if (response.status === 200) {
      this.setState({ ...this.state, certificates: response.data.results });
    }
  };

  renderInstitutesDropDown = () => {
    const { institutes } = this.state;
    const INSTITUTE = "institute";
    return (
      <React.Fragment>
        <div className="form-group row">
          <label htmlFor="certificate" className="col-4 col-form-label">
            Institute
          </label>
          <div className="col-8">
            <select
              className="form-control"
              onChange={this.handleInstituteChange}
              error={INSTITUTE}
              name={INSTITUTE}
              label={INSTITUTE}
            >
              <option value=""></option>
              {institutes.map((institute) => (
                <option key={institute.id} value={institute.id}>
                  {institute.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("issueDate", "Issue Date", "date")}
          {this.renderInput("expiryDate", "Expiry Date", "date")}
          {this.renderInstitutesDropDown()}
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
