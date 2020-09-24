import React, { Component } from "react";
import CertificateLookUp from "./CertificateLookUp";
import SelectedCertificates from "./SelectedCertificates";
import ScheduleFilters from "./ScheduleFilters";
import FilteredEmployees from "./FilteredEmployees";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";
import { Dropdown } from "semantic-ui-react";

class Schedule extends Component {
  state = {
    selectedCertificates: new Set(),
    trades: [],
    selectedTrade: "custom",
    startDate: undefined,
    endDate: undefined,
    filteredEmployees: [],
    projects: [],
    scheduledEmployees: new Set(),
  };

  addToScheduledEmployees = (employeeId) => {
    this.state.scheduledEmployees.add(employeeId);
    this.setState({ scheduledEmployees: this.state.scheduledEmployees });
  };

  handleCertificateSelect = (e) => {
    if (e.target.checked) {
      this.addSelectedCertificate(e.target.value);
    } else this.deleteSelectedCertificate(e.target.value);
  };
  handleFilterChange = (name, value) => {
    this.setState({ [name]: value });
  };
  addSelectedCertificate = (certificate) => {
    this.state.selectedCertificates.add(certificate);
    this.setState({ selectedCertificates: this.state.selectedCertificates });
  };

  deleteSelectedCertificate = (certificate) => {
    this.state.selectedCertificates.delete(certificate);
    this.setState({ selectedCertificates: this.state.selectedCertificates });
  };

  fetchFilteredEmployees = async () => {
    const { selectedCertificates, startDate, endDate } = this.state;
    const selectedCertificatesArray = Array.from(selectedCertificates);
    let endpoint = new URL(apiEndPoints.usersCollection());
    endpoint.searchParams.append("certifications", selectedCertificatesArray);
    endpoint.searchParams.append("availability_after", startDate);
    endpoint.searchParams.append("availability_before", endDate);
    // endpoint.searchParams.append("availability_range", {
    //   date_after: startDate,
    //   date_before: endDate,
    // });
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        filteredEmployees: response.data.results,
        scheduledEmployees: new Set(),
      });
    }
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

  async fetchProjects() {
    let endpoint = new URL(apiEndPoints.projectsCollection());
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({ projects: response.data.results });
    }
  }

  createSchedule = async (employeeId, projectId) => {
    const { startDate, endDate } = this.state;
    let endpoint = new URL(apiEndPoints.userScheduleCollection(employeeId));
    const scheduleData = {
      start_date: startDate,
      end_date: endDate,
      project_id: projectId,
    };
    const response = await http.post(endpoint.toString(), scheduleData);
    if (response.status === 201) {
      console.log("employee scheduled");
      this.addToScheduledEmployees(employeeId);
    }
  };

  componentDidMount() {
    this.fetchTrades();
    this.fetchProjects();
  }

  handleTradeChange = async (e, data) => {
    const selectedTradeId = data.value;
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
    // const TRADE = "trade";
    const tradeOptions = trades.map((trade) => ({
      key: trade.id,
      value: trade.id,
      text: trade.name,
    }));
    tradeOptions.unshift({ key: "custom", value: "custom", text: "Custom" });
    return (
      <React.Fragment>
        <Dropdown
          placeholder="Select Trade"
          fluid
          search
          selection
          options={tradeOptions}
          onChange={this.handleTradeChange}
        />
      </React.Fragment>
    );
  };
  renderSearchCertificate = () => {
    const { selectedCertificates } = this.state;
    return (
      <React.Fragment>
        <div className="generalComponentDiv">
          <h3>Certificates</h3>
          <CertificateLookUp
            handleCertificateUpdate={this.handleCertificateUpdate}
            handleCertificateSelect={this.handleCertificateSelect}
            selectedCertificates={selectedCertificates}
          />
        </div>
      </React.Fragment>
    );
  };

  renderFilteredEmployees = () => {
    const { filteredEmployees, projects, scheduledEmployees } = this.state;
    return (
      <div className="generalComponentDiv">
        <h4>Employees</h4>
        <FilteredEmployees
          filteredEmployees={filteredEmployees}
          projects={projects}
          createSchedule={this.createSchedule}
          scheduledEmployees={scheduledEmployees}
        />
      </div>
    );
  };

  render() {
    const {
      selectedCertificates,
      selectedTrade,
      filteredEmployees,
    } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <div className="generalComponentDiv">
              <h4>Trades</h4>
              {this.renderTradeDropDown()}
            </div>
            {selectedTrade === "custom" ? this.renderSearchCertificate() : null}
            <div className="generalComponentDiv">
              <h4>Selected</h4>
              <SelectedCertificates
                selectedCertificates={Array.from(selectedCertificates)}
                deleteSelectedCertificate={this.deleteSelectedCertificate}
              />
            </div>
          </div>
          <div className="col-8">
            <div className="generalComponentDiv">
              <h4>Filters</h4>
              <ScheduleFilters
                handleFilterChange={this.handleFilterChange}
                handleSearch={this.fetchFilteredEmployees}
              />
            </div>
            {filteredEmployees.length > 0
              ? this.renderFilteredEmployees()
              : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Schedule;
