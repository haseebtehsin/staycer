import React, { Component } from "react";
import EmployeeItem from "./EmployeeItem";

import PropTypes from "prop-types";

function EmployeeTable({ employees }) {
  return (
    <React.Fragment>
      <table
        className="table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Date Joined</th>
            <th scope="col">Certifications</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

EmployeeTable.propTypes = {
  employees: PropTypes.array,
};

export default EmployeeTable;
