import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function EmployeeItem({ employee }) {
  return (
    <React.Fragment>
      <tr>
        <th scope="row">{employee.id}</th>
        <td>{employee.email}</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>
          <NavLink to={`/employees/${employee.id}`}>
            <button type="button" className="btn btn-info">
              Details
            </button>
          </NavLink>
        </td>
      </tr>
    </React.Fragment>
  );
}

EmployeeItem.propTypes = {
  employee: PropTypes.object,
};

export default EmployeeItem;
