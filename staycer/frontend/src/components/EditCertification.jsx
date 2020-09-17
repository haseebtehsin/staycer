import React, { Component } from "react";
import Form from "./common/form";
import Joi, { schema } from "joi-browser";
import withModal from "./common/withModal";
import http from "../services/httpService";
import apiEndPoints from "../config/apiEndPoints";
import PropTypes from "prop-types";
import _ from "lodash";

class EditCertification extends Form {
  constructor(props) {
    super(props);
    const { certification } = this.props;
    this.state = {
      data: {
        issueDate: certification.issue_date,
        expiryDate: certification.expiry_date,
        validated: certification.validated,
        // certificate: certification.certificate,
        picture: null,
      },
      errors: {},
    };

    this.schema = {
      issueDate: Joi.date(),
      expiryDate: Joi.date(),
      validated: Joi.boolean(),
      //   certificate: Joi.string().min(0),
      picture: Joi.string().allow(null),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  doSubmit = async () => {
    const {
      employeeId,
      certification,
      handleModalClose,
      handleCertificationUpdate,
    } = this.props;
    const { data, pictureFile } = this.state;
    let updatedCertification = {
      issue_date: data.issueDate,
      expiry_date: data.expiryDate,
      validated: data.validated,
    };

    if (pictureFile) {
      const formData = new FormData();
      formData.append("picture", pictureFile);
      Object.keys(updatedCertification).forEach(function (key) {
        formData.append(key, updatedCertification[key]);
      });
      updatedCertification = formData;
    }

    try {
      const response = await http.patch(
        apiEndPoints.userCertificationResource(employeeId, certification.id),
        updatedCertification
      );

      if (response.status === 200) {
        console.log("Certification updated");
        handleCertificationUpdate();
        handleModalClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        // errors.email = "Email already exists";
        // this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("issueDate", "Issue Date", "date")}
          {this.renderInput("expiryDate", "Expiry Date", "date")}
          {this.renderCheckBox("validated", "Validated")}
          {/* {this.renderCertificatesDropDown()} */}
          {this.renderInput("picture", "Picture", "file")}
          {this.renderButton("Update")}
        </form>
      </div>
    );
  }
}

EditCertification.propTypes = {
  employeeId: PropTypes.number.isRequired,
  certification: PropTypes.object.isRequired,
  handleCertificationUpdate: PropTypes.func.isRequired,
};

const EditButton = ({ handleClick }) => {
  return (
    <button onClick={handleClick} type="button" className="btn btn-primary">
      <i class="fa fa-edit"></i>
    </button>
  );
};

export default withModal(EditCertification, EditButton, "Edit Employee");
