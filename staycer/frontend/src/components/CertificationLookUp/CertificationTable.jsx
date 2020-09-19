import React, { Component } from "react";
import CertificationItem from "./CertificationItem";

import PropTypes from "prop-types";

function CertificationTable({ certifications }) {
  return (
    <React.Fragment>
      <table
        className="table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col">Certification</th>
            <th scope="col">Issue Date</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Expring In(days)</th>
            <th scope="col">Worker</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((certification) => (
            <CertificationItem
              key={certification.id}
              certification={certification}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

CertificationTable.propTypes = {
  certifications: PropTypes.array,
};

export default CertificationTable;
