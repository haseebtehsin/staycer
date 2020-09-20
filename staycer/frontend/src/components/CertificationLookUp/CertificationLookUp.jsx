import React, { Component } from "react";
import CertificationTable from "./CertificationTable";
import SearchBar from "../common/SearchBar/SearchBar";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import "./CertificationLookUp.module.css";
import LookUp from "../common/LookUp/LookUp";

//TODO: Handle Errors
class CertificationLookUp extends LookUp {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      data: {
        certifications: [],
        daysFilter: null,
        expiredOnly: false,
      },
    };
  }

  async fetchData(pageNumber) {
    this.setFetching(true);
    // This line is just to test spinner for development
    // must remove in prod
    const timeoutResponse = await this.timeout(200);
    let endpoint = new URL(apiEndPoints.certificationCollection());
    const { searchText } = this.state;
    if (searchText) {
      endpoint.searchParams.append("search", searchText);
    }
    const { daysFilter, expiredOnly } = this.state.data;
    // We only want to have one of these filter set
    // NOT both
    if (daysFilter) {
      endpoint.searchParams.append("expiring_in", daysFilter);
    } else if (expiredOnly) {
      endpoint.searchParams.append("expired_only", true);
    }
    const offset = this.getPageOffset(pageNumber);
    endpoint.searchParams.append("offset", offset);
    const { pageSize } = this.state;
    endpoint.searchParams.append("limit", pageSize);
    endpoint.searchParams.append("expand", "user,certificate.institute");
    // endpoint.searchParams.append("ordering", "-date_joined");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        data: { ...this.state.data, certifications: response.data.results },
        totalCount: response.data.count,
      });
    }
    this.setFetching(false);
  }

  renderCertificationTable = () => {
    const { certifications } = this.state.data;
    return <CertificationTable certifications={certifications} />;
  };

  setDaysFilter = (days) => {
    this.setState({
      data: { ...this.state.data, daysFilter: days, expiredOnly: false },
    });
    this.fetchData(1);
  };

  setExpired = () => {
    this.setState({
      data: { ...this.state.data, daysFilter: null, expiredOnly: true },
    });
    this.fetchData(1);
  };

  renderCertificationFilters = () => {
    return (
      <div>
        <div styleName="certificationFilterButton">
          <button
            className="btn rounded-pill btn-success"
            onClick={() => this.setDaysFilter(null)}
          >
            All
          </button>
        </div>
        <div styleName="certificationFilterButton">
          <button
            className="btn rounded-pill btn-primary"
            onClick={() => this.setDaysFilter(30)}
          >
            30 days
          </button>
        </div>
        <div styleName="certificationFilterButton">
          <button
            className="btn rounded-pill btn-info"
            onClick={() => this.setDaysFilter(60)}
          >
            60 days
          </button>
        </div>
        <div styleName="certificationFilterButton">
          <button
            className="btn rounded-pill btn-warning"
            onClick={() => this.setDaysFilter(90)}
          >
            90 days
          </button>
        </div>
        <div styleName="certificationFilterButton">
          <button
            className="btn rounded-pill btn-danger"
            onClick={() => this.setExpired()}
          >
            Expired
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { fetchingData } = this.state;
    const { certifications } = this.state.data;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-5">
            <SearchBar onSearch={this.onSearch} />
          </div>
          <div className="col-7">{this.renderCertificationFilters()}</div>
        </div>
        <div className="row">
          <div className="col">
            <div styleName="tableDiv">
              {fetchingData ? this.renderFetchingData() : null}
              {certifications.length <= 0 && !fetchingData
                ? this.renderEmpty()
                : null}
              {!fetchingData && certifications.length > 0
                ? this.renderCertificationTable()
                : null}
            </div>
            <div>{this.renderPagination()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CertificationLookUp;
