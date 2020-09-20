import React, { Component } from "react";
import Joi, { schema } from "joi-browser";
import Input from "./input";
class Form extends Component {
  state = { data: {}, errors: {}, pictureFile: undefined };
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

  validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit(e) {
    e.preventDefault();
    const errors = this.validate();
    this.setState(
      {
        errors: errors || {},
      },
      () => {
        console.log(this.state.errors);
      }
    );
    if (errors) return;

    this.doSubmit();
  }

  handleChange(e) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];
    const data = { ...this.state.data };
    const targetType = e.target.type;
    let value = null;
    if (targetType === "checkbox") {
      value = e.target.checked;
    } else if (targetType === "file") {
      const picture = e.target.files[0];
      this.setState({ ...this.state, pictureFile: picture });
    } else value = e.target.value;
    data[e.target.name] = value;
    this.setState({ data, errors });
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckBox(name, label) {
    const { data, errors } = this.state;
    const value = data[name];
    const error = errors[name];
    const isChecked = value ? "checked" : null;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          id={name}
          type="checkbox"
          name={name}
          value={value}
          label={label}
          onChange={this.handleChange}
          error={errors[name]}
          className="form-control"
          checked={isChecked}
        />
        {error && (
          <div className="alert alert-danger" style={{ color: "black" }}>
            {error}
          </div>
        )}
      </div>
    );
  }
}

export default Form;
