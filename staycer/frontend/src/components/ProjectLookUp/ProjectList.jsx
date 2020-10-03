import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const ProjectList = ({ projects }) => {
  const renderProjectList = (project) => {
    return (
      <tr key={project.id}>
        <td>
          <NavLink to={`/project/${project.id}`}>{project.name}</NavLink>
        </td>
        <td>{project.total_scheduled}</td>
      </tr>
    );
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
            <th scope="col">Project</th>
            <th scope="col">Total Scheduled</th>
          </tr>
        </thead>
        <tbody>{projects.map((project) => renderProjectList(project))}</tbody>
      </table>
    </React.Fragment>
  );
};

export default ProjectList;
