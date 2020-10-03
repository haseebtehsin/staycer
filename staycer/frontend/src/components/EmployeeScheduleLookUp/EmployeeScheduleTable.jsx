import React, { Component } from "react";
import EmployeeScheduleItem from "./EmployeeScheduleItem";

const EmployeeScheduleTable = ({ schedules, updateSchedule }) => {
  return (
    <React.Fragment>
      <table
        className="table-striped table-bordered table-sm mt-3"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Project</th>
            <th scope="col">Unschedule</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <EmployeeScheduleItem
              key={schedule.id}
              schedule={schedule}
              updateSchedule={updateSchedule}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default EmployeeScheduleTable;
