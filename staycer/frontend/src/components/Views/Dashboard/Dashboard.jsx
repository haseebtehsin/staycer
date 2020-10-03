import React, { Component } from "react";
import CertificationExpiry from "./CertificationExpiry";
import TradeCount from "./TradeCount";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="generalComponentDiv col-7">
          <CertificationExpiry />
        </div>
        <div className="generalComponentDiv col-4">
          <TradeCount />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
