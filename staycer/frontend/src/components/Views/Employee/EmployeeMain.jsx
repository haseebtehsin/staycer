import EmployeeLookup from "../../EmployeeLookUp/EmployeeLookUp";
import React, { useState } from "react";
import CreateEmployee from "../../CreateEmployee";

const EmployeeMain = () => {
  const [newEmployeeAdded, handleNewEmployeeAdded] = useState(false);
  return (
    <React.Fragment>
      <div className="row">
        <CreateEmployee handleNewEmployeeAdded={handleNewEmployeeAdded} />
      </div>
      <div className="row">
        <EmployeeLookup
          newEmployeeAdded={newEmployeeAdded}
          handleNewEmployeeAdded={handleNewEmployeeAdded}
        />
      </div>
    </React.Fragment>
  );
};

export default EmployeeMain;
