import React, { Component } from "react";
import LookUp from "../common/LookUp/LookUp";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import ProjectList from "./ProjectList";
import SearchBar from "../common/SearchBar/SearchBar";
import CreateProject from "../CreateProject";
import "./ProjectLookUp.module.css";
class ProjectLookUp extends LookUp {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      pageSize: 10,
      data: {
        projects: [],
      },
    };
  }
  async fetchData(pageNumber) {
    this.setFetching(true);
    // This line is just to test spinner for development
    // must remove in prod
    // const timeoutResponse = await this.timeout(100);
    let endpoint = new URL(apiEndPoints.projectsCollection());
    const { searchText } = this.state;
    if (searchText) {
      endpoint.searchParams.append("search", searchText);
    }
    const offset = this.getPageOffset(pageNumber);
    endpoint.searchParams.append("offset", offset);
    const { pageSize } = this.state;
    endpoint.searchParams.append("limit", pageSize);
    // endpoint.searchParams.append("expand", "profile.position");
    endpoint.searchParams.append("ordering", "-id");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        data: { projects: response.data.results },
        totalCount: response.data.count,
      });
    }
    this.setFetching(false);
  }

  renderProjectsTable = () => {
    const { projects } = this.state.data;
    return (
      <React.Fragment>
        <ProjectList projects={projects} />
      </React.Fragment>
    );
  };
  render() {
    const { projects } = this.state.data;
    const { currentPage, fetchingData } = this.state;
    return (
      <React.Fragment>
        <h3>Projects</h3>
        <div className="row">
          <div className="col-6">
            <SearchBar onSearch={this.onSearch} />
          </div>
          <div className="col-6 d-flex justify-content-end">
            <CreateProject
              updateProjects={() => {
                this.fetchData(currentPage);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div styleName="projectTable">
              {fetchingData ? this.renderFetchingData() : null}
              {projects.length <= 0 && !fetchingData
                ? this.renderEmpty()
                : null}
              {!fetchingData && projects.length > 0
                ? this.renderProjectsTable()
                : null}
            </div>
            <div>{this.renderPagination()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectLookUp;
