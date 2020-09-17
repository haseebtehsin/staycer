import React, { Component } from "react";
import CertificationItem from "./CertificationItem";
import Pagination from "../common/Pagination";
import PropTypes from "prop-types";

function CertificationTable({
  certifications,
  handlePageChange,
  pageSize,
  currentPage,
  totalCount,
  employeeId,
}) {
  return (
    <React.Fragment>
      {certifications.map((certification) => (
        <CertificationItem
          key={certification.id}
          certification={certification}
          employeeId={employeeId}
        />
      ))}
    </React.Fragment>
  );
}

CertificationTable.propTypes = {
  certification: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default CertificationTable;
