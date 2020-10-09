import React, { Component } from "react";
import BootStrapSpinner from "react-bootstrap/Spinner";

const Spinner = () => {
  return (
    <div
      className="d-flex  flex-column justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <React.Fragment>
        <BootStrapSpinner animation="border" variant="primary" />
      </React.Fragment>
    </div>
  );
};

export default Spinner;
