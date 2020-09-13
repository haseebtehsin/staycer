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
}) {
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Cerification Name</th>
            <th scope="col">Issue Date</th>
            <th scope="col">Exipiry Date</th>
            <th scope="col">Validated</th>
            <th scope="col">Details</th>
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
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
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
