import React, { Component } from "react";
import LookUp from "../common/LookUp/LookUp";
import apiEndPoints from "../../config/apiEndPoints";
import http from "../../services/httpService";
import SearchBar from "../common/SearchBar/SearchBar";
import EmployeeScheduleTable from "./EmployeeScheduleTable";
import NotFound from "../common/NotFound";

class EmployeeScheduleLookUp extends LookUp {
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
    const { employeeId } = this.props;
    let endpoint = new URL(apiEndPoints.userScheduleCollection(employeeId));
    endpoint.searchParams.append("expand", "project");
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
    const { fetchingData, pageNumber } = this.state;
    return (
      <React.Fragment>
        <div>
          <SearchBar onSearch={this.onSearch} />
        </div>
        {fetchingData ? (
          this.renderFetchingData()
        ) : (
          <EmployeeScheduleTable
            schedules={schedules}
            updateSchedule={() => this.fetchData(pageNumber)}
          />
        )}
        <div>{this.renderPagination()}</div>
      </React.Fragment>
    );
  };

  render() {
    const { schedules } = this.state.data;
    const { fetchingData, pageNumber } = this.state;

    return (
      <React.Fragment>
        <h2>Schedule</h2>
        {schedules.length === 0 ? <NotFound /> : this.renderScheduleTable()}
      </React.Fragment>
    );
  }
}

export default EmployeeScheduleLookUp;
