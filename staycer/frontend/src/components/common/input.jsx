import React, { Component } from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-4 col-form-label">
        {label}
      </label>
      <div className="col-8">
        <input {...rest} name={name} id={name} className="form-control" />
        {error && (
          <div className="alert alert-danger" style={{ color: "black" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
