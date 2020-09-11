import React, { Component } from "react";
import PropTypes from "prop-types";

function EmployeeItem({ employee }) {
  return (
    <React.Fragment>
      <tr>
        <th scope="row">{employee.id}</th>
        <td>{employee.email}</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    </React.Fragment>
  );
}

EmployeeItem.propTypes = {
  employee: PropTypes.object,
};

export default EmployeeItem;
