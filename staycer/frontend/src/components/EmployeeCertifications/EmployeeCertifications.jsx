import React, { Component } from "react";
import EmployeeCertificationTable from "./EmployeeCertificationTable";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import PropTypes from "prop-types";
import CreateCertification from "../CreateCertification";

//TODO: Handle Errors
//TODO: Get api constants from one source
//TODO: Add 'loading' when fetching data
class EmployeeCertification extends Component {
  state = {
    certificationList: [],
    currentPage: 1,
    pageSize: 8,
    totalCount: 1,
  };

  async fetchEmployeeCertification(userId, pageNumber, pageSize) {
    let endpoint = new URL(apiEndPoints.userCertificationCollection(userId));
    const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;
    endpoint.searchParams.append("offset", offset);
    endpoint.searchParams.append("limit", pageSize);
    endpoint.searchParams.append("expand", "certificate");
    endpoint.searchParams.append("ordering", "-id");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        certificationList: response.data.results,
        totalCount: response.data.count,
      });
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    const { employeeId } = this.props;
    this.fetchEmployeeCertification(employeeId, page, this.state.pageSize);
  };

  updateEmployeeCertification = () => {
    const { employeeId } = this.props;
    const { currentPage: pageNumber, pageSize } = this.state;
    this.fetchEmployeeCertification(employeeId, pageNumber, pageSize);
  };

  componentDidMount() {
    this.updateEmployeeCertification();
  }

  renderEmptyCertification() {
    return (
      <div>
        <i className="fa fa-5x  fa-search-minus"></i>
      </div>
    );
  }

  renderCertificationList = (
    certifications,
    totalCount,
    handlePageChange,
    currentPage,
    pageSize,
    employeeId
  ) => {
    return (
      <EmployeeCertificationTable
        certifications={certifications}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
        employeeId={employeeId}
      />
    );
  };

  render() {
    const { employeeId } = this.props;
    const {
      certificationList: certifications,
      pageSize,
      currentPage,
      totalCount,
    } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Certifications</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-6 offset-md-6 d-flex justify-content-end">
            <CreateCertification
              employeeId={employeeId}
              updateCertifications={() =>
                this.fetchCertifications(employeeId, currentPage, pageSize)
              }
            />
          </div>
        </div>
        {certifications.length > 0
          ? this.renderCertificationList(
              certifications,
              totalCount,
              this.handlePageChange,
              currentPage,
              pageSize,
              employeeId
            )
          : this.renderEmptyCertification()}
      </React.Fragment>
    );
  }
}

EmployeeCertification.propTypes = {
  employeeId: PropTypes.number.isRequired,
};

export default EmployeeCertification;
