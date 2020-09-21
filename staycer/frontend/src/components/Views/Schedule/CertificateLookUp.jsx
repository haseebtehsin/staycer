import React, { Component } from "react";
import LookUp from "../../common/LookUp/LookUp";
import SearchBar from "../../common/SearchBar/SearchBar";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";

class CertificateLookUp extends LookUp {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      data: {
        certificates: [],
      },
    };
  }

  async fetchData(pageNumber) {
    this.setFetching(true);
    // This line is just to test spinner for development
    // must remove in prod
    const timeoutResponse = await this.timeout(200);
    let endpoint = new URL(apiEndPoints.certificatesCollection());
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
        data: { certificates: response.data.results },
        totalCount: response.data.count,
      });
    }
    this.setFetching(false);
  }

  render() {
    const { certificates } = this.state.data;
    const { handleCertificateSelect, selectedCertificates } = this.props;
    return (
      <React.Fragment>
        <div className="col-6">
          <SearchBar onSearch={this.onSearch} />
        </div>
        <ul>
          {certificates.map((certificate) => (
            <div className="form-check" key={certificate.name}>
              <input
                type="checkbox"
                className="form-check-input"
                onChange={handleCertificateSelect}
                value={certificate.name}
                checked={selectedCertificates.has(certificate.name)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                {certificate.name}
              </label>
            </div>
          ))}
        </ul>
        <div>{this.renderPagination()}</div>
      </React.Fragment>
    );
  }
}

export default CertificateLookUp;
