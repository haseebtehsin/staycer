import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserAvatar from "react-user-avatar";
import { Dropdown } from "semantic-ui-react";

const FilteredEmployees = ({
  filteredEmployees,
  projects,
  createSchedule,
  scheduledEmployees,
}) => {
  const [projectSelected, updateProjectSelected] = useState(new Map());
  const saveProjectSelected = (data, employeeId) => {
    const projectId = data.value;
    projectSelected.set(employeeId, projectId);
    updateProjectSelected(projectSelected);
  };

  const renderProjectDropDown = (employeeId) => {
    const projectOptions = projects.map((project) => ({
      key: project.id,
      value: project.id,
      text: project.name,
    }));
    projectOptions.unshift({ key: "", value: "", text: "" });
    return (
      <React.Fragment>
        <Dropdown
          placeholder="Select Project"
          fluid
          search
          selection
          options={projectOptions}
          onChange={(e, data) => saveProjectSelected(data, employeeId)}
        />
      </React.Fragment>
    );
  };

  const handleScheduleClick = (employeeId) => {
    if (projectSelected.has(employeeId)) {
      console.log("creating schedule");
      createSchedule(employeeId, projectSelected.get(employeeId));
    } else {
      console.log("select a project first");
    }
  };

  return (
    <React.Fragment>
      <table
        className="table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col">Employee</th>
            <th scope="col">Project</th>
            <th scope="col">Schedule</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="row">
                  <div className="col-2">
                    <UserAvatar
                      size="32"
                      colors={["#20c997"]}
                      name={`${employee.profile.first_name} ${employee.profile.last_name}`}
                      src={employee.profile.picture}
                    />
                  </div>
                  <div className="col-7">
                    <NavLink to={`/employees/${employee.id}`}>
                      {`${employee.profile.first_name} ${employee.profile.last_name}`}
                    </NavLink>
                  </div>
                </div>
              </td>
              <td>{renderProjectDropDown(employee.id)}</td>
              <td>
                {scheduledEmployees.has(employee.id) ? (
                  <span className="badge badge-success">Scheduled</span>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleScheduleClick(employee.id)}
                    // disabled={!projectSelected.has(employee.id)}
                  >
                    Schedule
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default FilteredEmployees;
