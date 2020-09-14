import React from "react";
import { formatDate } from "../../../../utils/date";
import apiEndPoints from "../../../config/apiEndPoints";
import EditableImage from "../../common/EditableImage/EditableImage";
const EmployeeInfo = ({ employee, setEdit, updateEmployeePicture }) => {
  return (
    <React.Fragment>
      <h1>Employee Details</h1>
      <EditableImage
        urlFunc={apiEndPoints.usersProfileResource(employee.id)}
        pictureName={"picture"}
        updatePictureUrl={updateEmployeePicture}
        pictureUrl={employee.profile.picture}
      />
      <ul>
        <li>Email: {employee.email}</li>
        <li>First Name: {employee.profile.first_name}</li>
        <li>Last Name: {employee.profile.last_name}</li>
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
    </React.Fragment>
  );
};

export default EmployeeInfo;
