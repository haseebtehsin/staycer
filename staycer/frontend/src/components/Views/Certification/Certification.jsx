import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CertificationLookUp from "../../CertificationLookUp/CertificationLookUp";

function Risk() {
  return (
    <React.Fragment>
      <div className="generalComponentDiv">
        <CertificationLookUp />
      </div>
    </React.Fragment>
  );
}

export default Risk;
