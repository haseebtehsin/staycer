import React, { useState, Component } from "react";
import CertificationLookUp from "../../Certifications/CertificationLookUp";
import CreateCertification from "../../CreateCertification";
export default function EmployeeCertifications({ employeeId }) {
  const [newCertificationAdded, handleNewCertificationAdded] = useState(false);
  return (
    <div>
      <React.Fragment>
        <h1>Certifications</h1>
        <CreateCertification
          employeeId={employeeId}
          handleNewCertificationAdded={handleNewCertificationAdded}
        />
        <CertificationLookUp
          employeeId={employeeId}
          handleNewCertificationAdded={handleNewCertificationAdded}
          newCertificationAdded={newCertificationAdded}
        />
      </React.Fragment>
    </div>
  );
}
