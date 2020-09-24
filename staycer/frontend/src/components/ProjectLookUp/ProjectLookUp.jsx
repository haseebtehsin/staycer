import React, { Component } from "react";
import LookUp from "../common/LookUp/LookUp";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import ProjectList from "./ProjectList";
import SearchBar from "../common/SearchBar/SearchBar";
import CreateProject from "../CreateProject";
class ProjectLookUp extends LookUp {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      data: {
        projects: [],
      },
    };
  }
  async fetchData(pageNumber) {
    this.setFetching(true);
    // This line is just to test spinner for development
    // must remove in prod
    const timeoutResponse = await this.timeout(200);
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
    // endpoint.searchParams.append("ordering", "-date_joined");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        data: { projects: response.data.results },
        totalCount: response.data.count,
      });
    }
    this.setFetching(false);
  }

  render() {
    const { projects } = this.state.data;
    const { currentPage } = this.state;
    return (
      <React.Fragment>
        <h5>Projects</h5>
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
          <ProjectList projects={projects} />
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectLookUp;
