import React, { Component } from "react";
import EmployeeList from "./EmployeeTable";
import SearchBar from "../common/SearchBar/SearchBar";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";

//TODO: Handle Errors
//TODO: Get api constants from one source
//TODO: Add 'loading' when fetching data
class EmployeeLookUp extends Component {
  state = {
    employeeList: [],
    currentPage: 1,
    pageSize: 6,
    totalCount: 1,
  };

  async fetchEmployees(pageNumber, pageSize, searchText = null) {
    let endpoint = new URL(apiEndPoints.usersV1());
    if (searchText) {
      endpoint.searchParams.append("search", searchText);
    }
    const offset = pageNumber === 1 ? 0 : pageNumber;
    endpoint.searchParams.append("offset", offset);
    endpoint.searchParams.append("limit", pageSize);
    const response = await http.get(endpoint.toString());
    this.setState({
      employeeList: response.data.results,
      totalCount: response.data.count,
    });
  }

  onSearch = (searchText) => {
    this.setState({ currentPage: 1 });
    this.fetchEmployees(1, this.state.pageSize, searchText);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.fetchEmployees(page, this.state.pageSize, null);
  };

  componentDidMount() {
    this.fetchEmployees(this.state.currentPage, this.state.pageSize, null);
  }

  renderEmptyEmployee() {
    return (
      <div>
        <i className="fa fa-5x  fa-search-minus"></i>
      </div>
    );
  }

  renderEmployeeList = (
    employees,
    totalCount,
    handlePageChange,
    currentPage,
    pageSize
  ) => {
    return (
      <EmployeeList
        employees={employees}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    );
  };

  render() {
    const {
      employeeList: employees,
      pageSize,
      currentPage,
      totalCount,
    } = this.state;
    return (
      <React.Fragment>
        <SearchBar onSearch={this.onSearch} />
        {employees.length > 0
          ? this.renderEmployeeList(
              employees,
              totalCount,
              this.handlePageChange,
              currentPage,
              pageSize
            )
          : this.renderEmptyEmployee()}
      </React.Fragment>
    );
  }
}

export default EmployeeLookUp;
