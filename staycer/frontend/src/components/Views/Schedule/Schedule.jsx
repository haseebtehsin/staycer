import React, { Component } from "react";
import CertificateLookUp from "./CertificateLookUp";
import SelectedCertificates from "./SelectedCertificates";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";

class Schedule extends Component {
  state = {
    selectedCertificates: new Set(),
    trades: [],
    selectedTrade: "custom",
  };

  handleCertificateSelect = (e) => {
    if (e.target.checked) {
      this.addSelectedCertificate(e.target.value);
    } else this.deleteSelectedCertificate(e.target.value);

    // console.log(e.target.value);
    // console.log(e.target.checked);
  };

  addSelectedCertificate = (certificate) => {
    this.state.selectedCertificates.add(certificate);
    this.setState({ selectedCertificates: this.state.selectedCertificates });
  };

  deleteSelectedCertificate = (certificate) => {
    this.state.selectedCertificates.delete(certificate);
    this.setState({ selectedCertificates: this.state.selectedCertificates });
  };

  async fetchTrades() {
    //TODO: Might want to implement search
    // and paging for trades too
    let endpoint = new URL(apiEndPoints.tradesCollection());
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({ trades: response.data.results });
    }
  }
  componentDidMount() {
    this.fetchTrades();
  }

  handleTradeChange = async (e) => {
    const selectedTradeId = e.target.value;
    if (selectedTradeId === "custom") {
      this.setState({
        selectedTrade: selectedTradeId,
        selectedCertificates: new Set(),
      });
      return;
    }
    this.setState({ selectedTrade: selectedTradeId });
    const response = await http.get(
      apiEndPoints.tradeCertificateCollection(selectedTradeId)
    );
    if (response.status === 200) {
      const updatedSelectedCertificates = response.data.results.map(
        (certificate) => {
          return certificate.name;
        }
      );
      this.setState({
        selectedCertificates: new Set(updatedSelectedCertificates),
      });
    }
  };

  renderTradeDropDown = () => {
    const { trades } = this.state;
    const TRADE = "trade";
    return (
      <React.Fragment>
        <label htmlFor={TRADE}>Institute</label>
        <select
          className="form-control"
          onChange={this.handleTradeChange}
          error={TRADE}
          name={TRADE}
          label={TRADE}
        >
          <option value="custom">Custom</option>
          {trades.map((trade) => (
            <option key={trade.id} value={trade.id}>
              {trade.name}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  };
  renderSearchCertificate = () => {
    const { selectedCertificates } = this.state;
    return (
      <React.Fragment>
        <div className="generalComponentDiv">
          <h3>Search Certifications</h3>
          <CertificateLookUp
            handleCertificateUpdate={this.handleCertificateUpdate}
            handleCertificateSelect={this.handleCertificateSelect}
            selectedCertificates={selectedCertificates}
          />
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { selectedCertificates, selectedTrade } = this.state;
    return (
      <React.Fragment>
        <div className="generalComponentDiv">
          <h3>Trades</h3>
          {this.renderTradeDropDown()}
        </div>
        {selectedTrade === "custom" ? this.renderSearchCertificate() : null}
        <div className="generalComponentDiv">
          <h3>Selected</h3>
          <SelectedCertificates
            selectedCertificates={Array.from(selectedCertificates)}
            deleteSelectedCertificate={this.deleteSelectedCertificate}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Schedule;
