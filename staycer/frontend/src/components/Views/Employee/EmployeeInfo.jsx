import React from "react";
import { formatDate } from "../../../../utils/date";
import apiEndPoints from "../../../config/apiEndPoints";
import EditableImage from "../../common/EditableImage/EditableImage";
import EditEmployee from "../../EditEmployee";
import { capitalize } from "../../../../utils/utils";
import "./EmployeeInfo.css";

import defaultAvatar from "../../../static/images/defaultAvatar.png";

const EmployeeInfo = ({ employee, updateEmployeePicture, updateEmployee }) => {
  // const employeePicture = employee.profile.picture
  //   ? employee.profile.picture
  //   : require("../../../static/images/defaultAvatar.png");
  const employeeName = `${capitalize(employee.profile.first_name)} ${capitalize(
    employee.profile.last_name
  )}`;
  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <h2>Employee Details</h2>
        </div>
      </div>
      <EditableImage
        urlFunc={apiEndPoints.usersProfileResource(employee.id)}
        pictureName={"picture"}
        updatePictureUrl={updateEmployeePicture}
        pictureUrl={employee.profile.picture}
        width="150px"
        height="150px"
      />
      {/* <img src={defaultAvatar}></img> */}
      <div className="row">
        <div className="col" styleName="employeeName">
          {employeeName}
        </div>
        <div className="col d-flex justify-content-end">
          <EditEmployee
            employee={employee}
            updateEmployee={() => {
              updateEmployee(employee.id);
            }}
          />
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <div className="row">
          <div className="col">
            <div styleName="employeeDescriptionField">Position </div>
            <div styleName="emplyeeDescriptionValue">{employee.role}</div>
          </div>
          <div className="col">
            <div styleName="employeeDescriptionField">
              <i className="fa fa-envelope"></i>
            </div>
            <div styleName="emplyeeDescriptionValue">{employee.email}</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div styleName="employeeDescriptionField">Date Joined</div>
            <div styleName="emplyeeDescriptionValue">
              {formatDate(employee.date_joined)}
            </div>
          </div>
          <div className="col">
            <div styleName="employeeDescriptionField">
              <i className="fa fa-mobile"></i>
            </div>
            <div styleName="emplyeeDescriptionValue">
              {employee.profile.phone}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeInfo;
