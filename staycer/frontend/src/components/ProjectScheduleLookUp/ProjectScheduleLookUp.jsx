import React, { Component } from "react";
import LookUp from "../common/LookUp/LookUp";
import apiEndPoints from "../../config/apiEndPoints";
import http from "../../services/httpService";
import SearchBar from "../common/SearchBar/SearchBar";
import ProjectScheduleTable from "./ProjectScheduleTable";

class ProjectScheduleLookUp extends LookUp {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      data: {
        schedules: [],
      },
    };
  }

  async fetchData(pageNumber) {
    this.setFetching(true);
    const timeoutResponse = await this.timeout(200);
    const { id: projectId } = this.props.match.params;
    this.setFetching;
    let endpoint = new URL(apiEndPoints.projectScheduleCollection(projectId));
    endpoint.searchParams.append("expand", "user.profile");
    const { searchText } = this.state;
    if (searchText) {
      endpoint.searchParams.append("search", searchText);
    }
    const offset = this.getPageOffset(pageNumber);
    endpoint.searchParams.append("offset", offset);
    const { pageSize } = this.state;
    endpoint.searchParams.append("limit", pageSize);
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        data: { schedules: response.data.results },
        totalCount: response.data.count,
      });
      //   console.log(response.data.results);
    }
    this.setFetching(false);
  }

  renderScheduleTable = () => {
    const { schedules } = this.state.data;
    return (
      <ProjectScheduleTable
        schedules={schedules}
        updateSchedule={() => this.fetchData(pageNumber)}
      />
    );
  };

  render() {
    const { schedules } = this.state.data;
    const { pageNumber, fetchingData } = this.state;
    return (
      <React.Fragment>
        <h3>Scheduled Employees</h3>
        <div>
          <SearchBar onSearch={this.onSearch} />
        </div>

        {fetchingData ? this.renderFetchingData() : null}
        {schedules.length <= 0 && !fetchingData ? this.renderEmpty() : null}
        {!fetchingData && schedules.length > 0
          ? this.renderScheduleTable()
          : null}

        <div>{this.renderPagination()}</div>
      </React.Fragment>
    );
  }
}

export default ProjectScheduleLookUp;
