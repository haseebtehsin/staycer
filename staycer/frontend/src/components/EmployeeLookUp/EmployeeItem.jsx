import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import UserAvatar from "react-user-avatar";
import { formatDate } from "../../../utils/date";
import { capitalize } from "../../../utils/utils";

function EmployeeItem({ employee }) {
  const employeeName = `${capitalize(employee.profile.first_name)} ${capitalize(
    employee.profile.last_name
  )}`;
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="row">
            <div className="col-2">
              <UserAvatar
                size="32"
                colors={["#20c997"]}
                name={employeeName}
                src={employee.profile.picture}
              />
            </div>
            <div className="col-7">
              <NavLink to={`/employees/${employee.id}`}>{employeeName}</NavLink>
            </div>
          </div>
        </td>
        <td>
          {employee.profile.position?.name
            ? employee.profile.position.name
            : "Unknown"}
        </td>
        <td>{formatDate(employee.date_joined)}</td>
        <td>{employee.total_certifications}</td>
      </tr>
    </React.Fragment>
  );
}

EmployeeItem.propTypes = {
  employee: PropTypes.object,
};

export default EmployeeItem;
