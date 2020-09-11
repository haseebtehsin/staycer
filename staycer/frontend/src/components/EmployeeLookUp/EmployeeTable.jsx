import React, { Component } from "react";
import EmployeeItem from "./EmployeeItem";
import Pagination from "../common/Pagination";
import PropTypes from "prop-types";

function EmployeeTable({
  employees,
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
            <th scope="col">id</th>
            <th scope="col">Email</th>
            <th scope="col">Hard Code 1</th>
            <th scope="col">Hard Code 2</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
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

EmployeeTable.propTypes = {
  employees: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default EmployeeTable;
