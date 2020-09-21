import EmployeeLookup from "../../EmployeeLookUp/EmployeeLookUp";
import React, { useState } from "react";

const EmployeeMain = () => {
  return (
    <React.Fragment>
      <div className="generalComponentDiv">
        <EmployeeLookup />
      </div>
    </React.Fragment>
  );
};

export default EmployeeMain;
