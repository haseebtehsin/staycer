import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./ProjectList.module.css";

const ProjectList = ({ projects }) => {
  const renderProjectCard = (project) => {
    return (
      <div key={project.id} styleName="projectListCard" className="card">
        <div className="card-body">
          <NavLink to={`/project/${project.id}`}>
            <h5 className="card-title">{project.name}</h5>
          </NavLink>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {projects.map((project) => renderProjectCard(project))}
    </React.Fragment>
  );
};

export default ProjectList;
