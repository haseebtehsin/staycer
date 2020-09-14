import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageModal from "../common/ImageModal/ImageModal";

function CertificationItem({ certification }) {
  return (
    <React.Fragment>
      <tr>
        <th scope="row">{certification.certificate.name}</th>
        <td>{certification.issue_date}</td>
        <td>{certification.expiry_date}</td>
        <td>{certification.validated ? "Yes" : "No"}</td>
        <td>
          <div style={{ width: "50px", height: "50px" }}>
            <ImageModal imageUrl={certification.picture} />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

CertificationItem.propTypes = {
  certification: PropTypes.object,
};

export default CertificationItem;
