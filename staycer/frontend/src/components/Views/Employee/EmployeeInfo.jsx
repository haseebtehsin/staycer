import React, { Component } from "react";
import { formatDate } from "../../../../utils/date";

const EmployeeInfo = ({ employee, setEdit }) => {
  return (
    <React.Fragment>
      <h1>Employee Details</h1>
      <div>
        <ul>
          <li>Email: {employee.email}</li>
          <li>First Name: {employee.first_name}</li>
          <li>Last Name: {employee.last_name}</li>
          <li>Date Joined: {formatDate(employee.date_joined)}</li>
          <li>Phone number: {employee.profile?.phone}</li>
        </ul>
        <div>
          <button
            onClick={() => setEdit(true)}
            type="button"
            className="btn btn-info"
          >
            Edit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeInfo;
