import React, { Component } from "react";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";

class ProjectDetails extends Component {
  state = { schedules: [] };

  updateProject = async (projectId) => {
    let endpoint = new URL(apiEndPoints.projectScheduleCollection(projectId));
    endpoint.searchParams.append("expand", "user.profile");
    const response = await http.get(endpoint.toString());
    if (response.status === 200) {
      this.setState({ schedules: response.data.results });
      console.log(response.data.results);
    }
  };

  componentDidMount() {
    const { id: projectId } = this.props.match.params;
    this.updateProject(projectId);
  }

  renderEmployeeList = (schedule) => {
    return (
      <div key={schedule.id}>
        <span>{schedule.user.profile.first_name}-</span>
        <span>{schedule.user.profile.last_name}---</span>
        <span>{schedule.start_date}---</span>
        <span>{schedule.end_date}</span>
      </div>
    );
  };

  render() {
    const { schedules } = this.state;
    return (
      <React.Fragment>
        <h3>Scheduled Employees</h3>
        {schedules.map((schedule) => this.renderEmployeeList(schedule))}
      </React.Fragment>
    );
  }
}

export default ProjectDetails;
