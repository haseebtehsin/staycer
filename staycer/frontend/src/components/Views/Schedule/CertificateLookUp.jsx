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
      pageSize: 5,
      data: {
        certificates: [],
      },
    };
  }

  async fetchData(pageNumber) {
    this.setFetching(true);
    // This line is just to test spinner for development
    // must remove in prod
    const timeoutResponse = await this.timeout(100);
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
    const { fetchingData } = this.state;
    const { certificates } = this.state.data;
    const { handleCertificateSelect, selectedCertificates } = this.props;
    return (
      <React.Fragment>
        <div className="mb-3" style={{ width: "50%" }}>
          <SearchBar onSearch={this.onSearch} />
        </div>
        <div>
          <ul style={{ "margin-left": "-7px" }}>
            {fetchingData
              ? this.renderFetchingData()
              : certificates.map((certificate) => (
                  <div className="form-check mb-1" key={certificate.name}>
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
        </div>
        <div>{this.renderPagination()}</div>
      </React.Fragment>
    );
  }
}

export default CertificateLookUp;
