import React, { Component } from "react";
import apiEndPoints from "../../../config/apiEndPoints";
import http from "../../../services/httpService";

class EmployeeProfile extends Component {
  state = { id: undefined };

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state.id = id;
  }

  async fetchEmployee(id) {
    const response = await http.get(apiEndPoints.usersResource(id));
    console.log(response.data);
  }
  componentDidMount() {
    this.fetchEmployee(this.state.id);
  }

  render() {
    const { id } = this.state;
    return <h1>Employee id- {id}</h1>;
  }
}

export default EmployeeProfile;
