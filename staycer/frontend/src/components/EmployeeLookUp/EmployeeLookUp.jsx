import React, { Component } from "react";
import EmployeeTable from "./EmployeeTable";
import SearchBar from "../common/SearchBar/SearchBar";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import CreateEmployee from "../CreateEmployee";
import LookUp from "../common/LookUp/LookUp";
import "./EmployeeLookUp.module.css";

//TODO: Handle Errors
class EmployeeLookUp extends LookUp {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      data: {
        employees: [],
      },
    };
  }
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetchData(pageNumber) {
    this.setFetching(true);
    // This line is just to test spinner for development
    // must remove in prod
    const timeoutResponse = await this.timeout(200);
    let endpoint = new URL(apiEndPoints.usersCollection());
    const { searchText } = this.state;
    if (searchText) {
      endpoint.searchParams.append("search", searchText);
    }
    const offset = this.getPageOffset(pageNumber);
    endpoint.searchParams.append("offset", offset);
    const { pageSize } = this.state;
    endpoint.searchParams.append("limit", pageSize);
    endpoint.searchParams.append("expand", "profile.position");
    endpoint.searchParams.append("ordering", "-date_joined");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        data: { employees: response.data.results },
        totalCount: response.data.count,
      });
    }
    this.setFetching(false);
  }

  renderEmployeeTable = () => {
    const { employees } = this.state.data;
    return <EmployeeTable employees={employees} />;
  };

  render() {
    const { currentPage, fetchingData } = this.state;
    const { employees } = this.state.data;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            <SearchBar onSearch={this.onSearch} />
          </div>
          <div className="col-6 d-flex justify-content-end">
            <CreateEmployee
              updateEmployees={() => {
                this.fetchData(currentPage);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div styleName="tableDiv">
              {fetchingData ? this.renderFetchingData() : null}
              {employees.length <= 0 && !fetchingData
                ? this.renderEmpty()
                : null}
              {!fetchingData && employees.length > 0
                ? this.renderEmployeeTable()
                : null}
            </div>
            <div>{this.renderPagination()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeLookUp;
