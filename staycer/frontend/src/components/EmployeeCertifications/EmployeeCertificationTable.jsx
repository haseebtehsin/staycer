import React, { Component } from "react";
import EmployeeCertificationItem from "./EmployeeCertificationItem";
import Pagination from "../common/Pagination";
import PropTypes from "prop-types";

function EmployeeCertificationTable({
  certifications,
  handlePageChange,
  pageSize,
  currentPage,
  totalCount,
  employeeId,
  handleCertificationDelete,
}) {
  return (
    <React.Fragment>
      {certifications.map((certification) => (
        <EmployeeCertificationItem
          key={certification.id}
          certification={certification}
          employeeId={employeeId}
          handleCertificationDelete={handleCertificationDelete}
        />
      ))}
    </React.Fragment>
  );
}

EmployeeCertificationTable.propTypes = {
  certification: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handleCertificationDelete: PropTypes.func.isRequired,
};

export default EmployeeCertificationTable;
