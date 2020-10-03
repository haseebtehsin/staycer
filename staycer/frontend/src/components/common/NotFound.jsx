import React, { Component } from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <div
        className="d-flex  flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div>
          <i
            className="fa fa-5x  fa-exclamation-triangle"
            style={{ color: "rgb(3 195 252)" }}
          ></i>
        </div>
        <div>
          <h4>No Data</h4>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
