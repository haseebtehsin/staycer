import React, { Component } from "react";
import PropTypes from "prop-types";

function CertificationItem({ certification }) {
  return (
    <React.Fragment>
      <tr>
        <th scope="row">{certification.certificate.name}</th>
        <td>{certification.issue_date}</td>
        <td>{certification.expiry_date}</td>
        <td>{certification.validated ? "Yes" : "No"}</td>
        <td>
          <button type="button" className="btn btn-info">
            Details
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

CertificationItem.propTypes = {
  certification: PropTypes.object,
};

export default CertificationItem;
