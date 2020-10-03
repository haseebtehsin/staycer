import React, { Component } from "react";
import CertificateLookUp from "./CertificateLookUp";
import SelectedCertificates from "./SelectedCertificates";
import ScheduleFilters from "./ScheduleFilters";
import FilteredEmployees from "./FilteredEmployees";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";
import { Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";

class Schedule extends Component {
  state = {
    selectedCertificates: new Set(),
    trades: [],
    selectedTrade: undefined,
    startDate: undefined,
    endDate: undefined,
    filteredEmployees: [],
    projects: [],
    selectedEmployees: new Set(),
    selectedProject: undefined,
  };

  addSelectedEmployee = (employeeId) => {
    this.state.selectedEmployees.add(employeeId);
    this.setState({
      selectedEmployees: this.state.selectedEmployees,
    });
  };

  deleteSelectedEmployee = (employeeId) => {
    this.state.selectedEmployees.delete(employeeId);
    this.setState({
      selectedEmployees: this.state.selectedEmployees,
    });
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  handleCertificateSelect = (e) => {
    if (e.target.checked) {
      this.addSelectedCertificate(e.target.value);
    } else this.deleteSelectedCertificate(e.target.value);
    this.fetchFilteredEmployees();
  };
  handleFilterChange = async (name, value) => {
    await this.setStateAsync({ [name]: value });
    this.fetchFilteredEmployees();
  };

  addSelectedCertificate = async (certificate) => {
    this.state.selectedCertificates.add(certificate);
    await this.setStateAsync({
      selectedCertificates: this.state.selectedCertificates,
    });
  };

  deleteSelectedCertificate = async (certificate) => {
    this.state.selectedCertificates.delete(certificate);
    await this.setStateAsync({
      selectedCertificates: this.state.selectedCertificates,
    });
  };

  updateProjectSelected = (project) => {
    console.log(typeof project);
    this.setState({ selectedProject: project });
  };

  scheduleValidate = () => {
    const {
      startDate,
      endDate,
      selectedCertificates,
      selectedEmployees,
      selectedProject,
    } = this.state;
    if (
      (endDate > startDate) &
      (selectedCertificates.size > 0) &
      (selectedEmployees.size > 0) &
      (typeof selectedProject === "number")
    ) {
      return true;
    } else return false;
  };

  searchValidate = () => {
    const { startDate, endDate, selectedCertificates } = this.state;
    if ((endDate > startDate) & (selectedCertificates.size > 0)) {
      return true;
    } else return false;
  };

  fetchFilteredEmployees = async () => {
    if (!this.searchValidate()) {
      console.log("Fields missing, not fetching");
      this.setState({
        filteredEmployees: [],
      });
      return;
    }
    console.log("fetching employees..");
    const { selectedCertificates, startDate, endDate } = this.state;
    const selectedCertificatesArray = Array.from(selectedCertificates);
    let endpoint = new URL(apiEndPoints.usersCollection());
    endpoint.searchParams.append("certifications", selectedCertificatesArray);

    if (startDate && endDate) {
      endpoint.searchParams.append("availability_after", startDate);
      endpoint.searchParams.append("availability_before", endDate);
    }

    // endpoint.searchParams.append("availability_range", {
    //   date_after: startDate,
    //   date_before: endDate,
    // });
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({
        filteredEmployees: response.data.results,
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

  createSchedule = async () => {
    const {
      startDate,
      endDate,
      selectedEmployees,
      selectedProject,
    } = this.state;
    console.log("creating schedule");
    console.log(
      `${startDate} ${endDate} ${selectedEmployees} ${selectedProject}`
    );
    const scheduleDataList = [];
    selectedEmployees.forEach((selectedEmployee) => {
      scheduleDataList.push({
        start_date: startDate,
        end_date: endDate,
        project: selectedProject,
        user: selectedEmployee,
      });
    });
    let endpoint = new URL(apiEndPoints.scheduleCollection());
    try {
      const response = await http.post(endpoint.toString(), scheduleDataList);
      if (response.status === 201) {
        console.log("employees scheduled");
        toast.success("Employee Scheduled", { autoClose: 2000 });
        this.setState({ selectedEmployees: new Set() });
        this.fetchFilteredEmployees();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error scheduling employees");
        toast.error("Error Scheduling", { autoClose: 2000 });
      }
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
      this.fetchFilteredEmployees();
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
          <h3>Select Certificate</h3>
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
    const { filteredEmployees, projects, selectedEmployees } = this.state;
    return (
      <div className="generalComponentDiv">
        <h4>Employees</h4>
        <FilteredEmployees
          filteredEmployees={filteredEmployees}
          projects={projects}
          createSchedule={this.createSchedule}
          addSelectedEmployee={this.addSelectedEmployee}
          deleteSelectedEmployee={this.deleteSelectedEmployee}
          scheduleValidate={this.scheduleValidate}
          updateProjectSelected={this.updateProjectSelected}
          selectedEmployees={selectedEmployees}
        />
      </div>
    );
  };

  renderSelectedCertificates = () => {
    const { selectedCertificates } = this.state;
    return (
      <div className="generalComponentDiv">
        <h3>Selected Certificates</h3>
        <SelectedCertificates
          selectedCertificates={Array.from(selectedCertificates)}
          deleteSelectedCertificate={this.deleteSelectedCertificate}
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
        <div className="row ">
          <div className="col-4">
            <div className="generalComponentDiv">
              <h4>Trades</h4>
              {this.renderTradeDropDown()}
            </div>
            {selectedTrade === "custom" ? this.renderSearchCertificate() : null}
            {selectedCertificates.size > 0
              ? this.renderSelectedCertificates()
              : null}
          </div>
          <div className="col-8">
            <div className="generalComponentDiv">
              <h4>Filters</h4>
              <ScheduleFilters handleFilterChange={this.handleFilterChange} />
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
