import React, { Component } from "react";
import "./ScheduleFilters.module.css";
import Input from "../../common/input";
import Joi from "joi-browser";

class ScheduleFilters extends Component {
  constructor(props) {
    super(props);
    this.schema = {
      startDate: Joi.date().required(),
      endDate: Joi.date().min(Joi.ref("startDate")).required(),
    };
    this.state = {
      data: { startDate: undefined, endDate: undefined },
      errors: {},
    };
  }

  //   validateProperty = (input) => {
  //     const obj = { [input.name]: input.value };
  //     const schema = { [input.name]: this.schema[input.name] };
  //     const { error } = Joi.validate(obj, schema);
  //     return error ? error.details[0].message : null;
  //   };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = (e) => {
    // const { errors } = this.state;
    // const errorMessage = this.validateProperty(e.target);
    // if (errorMessage) errors[e.target.name] = errorMessage;
    // else delete errors[e.target.name];
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({
      ...this.state,
      data: data,
    });
    this.props.handleFilterChange(e.target.name, e.target.value);
  };

  verifyAndHandleSearch = () => {
    const { handleSearch } = this.props;
    const errors = this.validate();
    if (!errors) {
      handleSearch();
    } else {
      console.log(errors);
    }
  };

  render() {
    // const { handleSearch } = this.props;
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div styleName="scheduleFilterItemdiv">
          <Input
            type="date"
            name="startDate"
            label="Start Date"
            onChange={this.handleChange}
            error={errors["startDate"]}
          />
        </div>
        <div styleName="scheduleFilterItemdiv">
          <Input
            type="date"
            name="endDate"
            label="End Date"
            onChange={this.handleChange}
            error={errors["endDate"]}
          />
        </div>
        <div styleName="scheduleFilterItemdiv">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.verifyAndHandleSearch}
            disabled={this.validate()}
          >
            <i className="fa fa-search">Search</i>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ScheduleFilters;
