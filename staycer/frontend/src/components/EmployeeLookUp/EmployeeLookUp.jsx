import React, { Component } from "react";
import EmployeeList from "./EmployeeTable";
import SearchBar from "../common/SearchBar/SearchBar";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import CreateEmployee from "../CreateEmployee";
import Pagination from "../common/Pagination";
import Spinner from "react-bootstrap/Spinner";
import "./EmployeeLookUp.module.css";

//TODO: Handle Errors
//TODO: Get api constants from one source
//TODO: Add 'loading' when fetching data
class EmployeeLookUp extends Component {
  state = {
    employees: [],
    currentPage: 1,
    pageSize: 10,
    totalCount: 1,
    fetchingEmployees: false,
  };

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setFetchingEmployee = (value) => {
    this.setState({ fetchingEmployees: value });
  };

  async fetchEmployees(pageNumber, pageSize, searchText = null) {
    this.setFetchingEmployee(true);
    // This line is just to test spinner for development
    // must remove in prod
    const timeoutResponse = await this.timeout(200);
    let endpoint = new URL(apiEndPoints.usersCollection());
    if (searchText) {
      endpoint.searchParams.append("search", searchText);
    }
    const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;
    endpoint.searchParams.append("offset", offset);
    endpoint.searchParams.append("limit", pageSize);
    endpoint.searchParams.append("expand", "profile");
    endpoint.searchParams.append("ordering", "-date_joined");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        employees: response.data.results,
        totalCount: response.data.count,
      });
    }
    this.setFetchingEmployee(false);
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
      <div
        className="row row d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <i className="fa fa-5x  fa-search-minus"></i>
      </div>
    );
  }

  renderEmployeeList = () => {
    const { employees, pageSize, currentPage, totalCount } = this.state;
    return <EmployeeList employees={employees} />;
  };

  renderFetchingEmployees() {
    return (
      <div
        className="row row d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <React.Fragment>
          <Spinner animation="border" />
        </React.Fragment>
      </div>
    );
  }

  render() {
    const {
      employees,
      pageSize,
      currentPage,
      fetchingEmployees,
      totalCount,
    } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            <SearchBar onSearch={this.onSearch} />
          </div>
          <div className="col-6 d-flex justify-content-end">
            <CreateEmployee
              updateEmployees={() => {
                this.fetchEmployees(currentPage, pageSize, null);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div styleName="tableDiv">
              {fetchingEmployees ? this.renderFetchingEmployees() : null}
              {employees.length <= 0 && !fetchingEmployees
                ? this.renderEmptyEmployee()
                : null}
              {!fetchingEmployees && employees.length > 0
                ? this.renderEmployeeList()
                : null}
            </div>
            <div>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                handlePageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeLookUp;
