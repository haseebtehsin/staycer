import React, { Component } from "react";
import CertificationTable from "./CertificationTable";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import PropTypes from "prop-types";

//TODO: Handle Errors
//TODO: Get api constants from one source
//TODO: Add 'loading' when fetching data
class CertificationLookUp extends Component {
  state = {
    certificationList: [],
    currentPage: 1,
    pageSize: 2,
    totalCount: 1,
  };

  async fetchCertifications(userId, pageNumber, pageSize) {
    let endpoint = new URL(apiEndPoints.userCertificationCollection(userId));
    const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize;
    endpoint.searchParams.append("offset", offset);
    endpoint.searchParams.append("limit", pageSize);
    endpoint.searchParams.append("expand", "certificate");
    const response = await http.get(endpoint.toString());
    this.setState({
      certificationList: response.data.results,
      totalCount: response.data.count,
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    const { employeeId } = this.props;
    this.fetchCertifications(employeeId, page, this.state.pageSize);
  };

  componentDidMount() {
    const { employeeId } = this.props;
    const { currentPage: pageNumber, pageSize } = this.state;
    this.fetchCertifications(employeeId, pageNumber, pageSize);
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
    pageSize
  ) => {
    return (
      <CertificationTable
        certifications={certifications}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    );
  };

  render() {
    const {
      certificationList: certifications,
      pageSize,
      currentPage,
      totalCount,
    } = this.state;
    return (
      <React.Fragment>
        {certifications.length > 0
          ? this.renderCertificationList(
              certifications,
              totalCount,
              this.handlePageChange,
              currentPage,
              pageSize
            )
          : this.renderEmptyCertification()}
      </React.Fragment>
    );
  }
}

CertificationLookUp.propTypes = {
  employeeId: PropTypes.number.isRequired,
};

export default CertificationLookUp;
