import React, { Component } from "react";
import CertificationLookUp from "../../Certifications/CertificationLookUp";

export default function EmployeeCertifications({ employeeId }) {
  return (
    <div>
      <React.Fragment>
        <h1>Certifications</h1>
        <CertificationLookUp employeeId={employeeId} />
      </React.Fragment>
    </div>
  );
}
