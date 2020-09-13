import React, { useState, useEffect, useCallback, Component } from "react";
import { formatDate } from "../../../../utils/date";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";
const EmployeeInfo = ({ employee, setEdit, updateEmployeePicture }) => {
  const [picture, updatePicture] = useState(null);
  useEffect(() => {}, [picture]);

  const onFileChange = useCallback(
    (event) => {
      updatePicture(event.target.files[0]);
    },
    [picture]
  );

  const onFileUpload = useCallback(async () => {
    if (!picture) return;
    const formData = new FormData();
    formData.append("picture", picture, picture.name);
    const response = await http.patch(
      apiEndPoints.usersProfileResource(employee.id),
      formData
    );
    if (response.status === 200) {
      updateEmployeePicture(response.data.picture);
    }
  }, [picture]);

  return (
    <React.Fragment>
      <h1>Employee Details</h1>

      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <h3>Upload Image</h3>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
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
        </div>
        <div className="col-6">
          <img
            src={employee.profile.picture}
            className="rounded-circle"
            width="200"
            height="200"
          ></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeInfo;
