import React, { Component } from "react";
import { formatDate } from "../../../utils/date";
import { capitalize } from "../../../utils/utils";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import UserAvatar from "react-user-avatar";
import apiEndPoints from "../../config/apiEndPoints";
import http from "../../services/httpService";

const ProjectScheduleItem = ({ schedule, updateSchedule }) => {
  console.log(schedule);
  const employeeName = `${capitalize(
    schedule.user.profile.first_name
  )} ${capitalize(schedule.user.profile.last_name)}`;

  const unscheduleEmployee = async (projectId, scheduleId) => {
    console.log("unscheduling...");
    let endpoint = new URL(
      apiEndPoints.projectScheduleResource(projectId, scheduleId)
    );
    try {
      const response = await http.delete(endpoint.toString());
      if (response.status === 204) {
        console.log("schedule deleted");
        toast.success("Unscheduled", { autoClose: 2000 });
        updateSchedule();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error Unscheduling");
        toast.error("Error Unscheduling", { autoClose: 2000 });
      }
    }
  };
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
                src={schedule.user.profile.picture}
              />
            </div>
            <div className="col-7">
              <NavLink to={`/employees/${schedule.user.id}`}>
                {employeeName}
              </NavLink>
            </div>
          </div>
        </td>
        <td>
          {schedule.user.profile.position?.name
            ? schedule.user.profile.position.name
            : "Unknown"}
        </td>
        <td>{formatDate(schedule.start_date)}</td>
        <td>{formatDate(schedule.end_date)}</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => unscheduleEmployee(schedule.project, schedule.id)}
          >
            Unschedule
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ProjectScheduleItem;
