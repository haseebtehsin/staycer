import React, { Component } from "react";
import { formatDate } from "../../../utils/date";
import { NavLink } from "react-router-dom";
import apiEndPoints from "../../config/apiEndPoints";
import http from "../../services/httpService";

const EmployeeScheduleItem = ({ schedule, updateSchedule }) => {
  const unscheduleEmployee = async (projectId, scheduleId) => {
    console.log("unscheduling...");
    let endpoint = new URL(
      apiEndPoints.projectScheduleResource(projectId, scheduleId)
    );
    const response = await http.delete(endpoint.toString());
    if (response.status === 204) {
      console.log("schedule deleted");
      updateSchedule();
    }
  };
  return (
    <React.Fragment>
      <tr>
        <td>{formatDate(schedule.start_date)}</td>
        <td>{formatDate(schedule.end_date)}</td>
        <td>
          <NavLink to={`/project/${schedule.project.id}`}>
            {schedule.project.name}
          </NavLink>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => unscheduleEmployee(schedule.project.id, schedule.id)}
          >
            Unschedule
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default EmployeeScheduleItem;
