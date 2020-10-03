import React, { Component } from "react";
import "./ScheduleFilters.module.css";
import Input from "../../common/input";

class ScheduleFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { startDate: undefined, endDate: undefined },
    };
  }

  handleChange = (e) => {
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      data: data,
    });
    this.props.handleFilterChange(e.target.name, e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div styleName="scheduleFilterItemdiv">
          <Input
            type="date"
            name="startDate"
            label="Start Date"
            onChange={this.handleChange}
          />
        </div>
        <div styleName="scheduleFilterItemdiv">
          <Input
            type="date"
            name="endDate"
            label="End Date"
            onChange={this.handleChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ScheduleFilters;
