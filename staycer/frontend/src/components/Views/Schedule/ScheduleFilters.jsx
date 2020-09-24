import React, { Component } from "react";
import "./ScheduleFilters.module.css";
import Input from "../../common/input";
import Joi from "joi-browser";

class ScheduleFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { startDate: undefined, endDate: undefined },
    };
  }

  validateDates = () => {
    const { startDate, endDate } = this.state.data;
    const { setDatesValidated } = this.props;
    if (startDate && endDate) {
      if (endDate > startDate) {
        setDatesValidated(true);
      }
    } else {
      setDatesValidated(false);
    }
  };
  handleChange = (e) => {
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      data: data,
    });
    this.validateDates();
    this.props.handleFilterChange(e.target.name, e.target.value);
  };

  verifyAndHandleSearch = () => {
    const { handleSearch } = this.props;
    handleSearch();
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
        <div styleName="scheduleFilterItemdiv">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.verifyAndHandleSearch}
            // disabled={this.validate()}
          >
            <i className="fa fa-search">Search</i>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ScheduleFilters;
