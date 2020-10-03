import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserAvatar from "react-user-avatar";
import { Dropdown } from "semantic-ui-react";
import { capitalize } from "../../../../utils/utils";

import "./FilteredEmployees.module.css";

const FilteredEmployees = ({
  filteredEmployees,
  projects,
  createSchedule,
  addSelectedEmployee,
  deleteSelectedEmployee,
  scheduleValidate,
  updateProjectSelected,
  selectedEmployees,
}) => {
  const saveEmployeeSelected = (e) => {
    const employeeId = e.target.value;
    if (e.target.checked) {
      addSelectedEmployee(employeeId);
    } else deleteSelectedEmployee(employeeId);
  };

  const renderProjectDropDown = () => {
    const projectOptions = projects.map((project) => ({
      key: project.id,
      value: project.id,
      text: project.name,
    }));
    projectOptions.unshift({ key: "", value: "", text: "" });
    return (
      <React.Fragment>
        <div
          styleName="filteredEmployeesSelectionItemdiv"
          style={{ width: "80%" }}
        >
          <Dropdown
            placeholder="Select Project"
            fluid
            search
            selection
            options={projectOptions}
            onChange={(e, data) => updateProjectSelected(data.value)}
          />
        </div>
      </React.Fragment>
    );
  };

  const handleScheduleClick = () => {
    createSchedule();
  };

  const renderScheduleButton = (employeeId) => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleScheduleClick()}
        // disabled={!projectSelected.has(employeeId)}
      >
        Schedule
      </button>
    );
  };

  return (
    <React.Fragment>
      {renderProjectDropDown()}
      <div styleName="filteredEmployeesSelectionItemdiv">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleScheduleClick()}
          disabled={!scheduleValidate()}
        >
          Schedule
        </button>
      </div>
      <table
        className="table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col">Employee</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="row align-items-center">
                  <div className="col-2 d-flex justify-content-start">
                    <UserAvatar
                      size="32"
                      colors={["#20c997"]}
                      name={`${capitalize(
                        employee.profile.first_name
                      )} ${capitalize(employee.profile.last_name)}`}
                      src={employee.profile.picture}
                    />
                  </div>
                  <div className="col-7 d-flex justify-content-start">
                    <NavLink to={`/employees/${employee.id}`}>
                      {`${capitalize(employee.profile.first_name)} ${capitalize(
                        employee.profile.last_name
                      )}`}
                    </NavLink>
                  </div>
                </div>
              </td>
              <td>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={saveEmployeeSelected}
                    value={employee.id}
                    // checked={true}
                    checked={selectedEmployees.has(employee.id.toString())}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default FilteredEmployees;
