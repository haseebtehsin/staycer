import React from "react";
import "./SelectedCertificates.module.css";
const SelectedCertificates = ({
  selectedCertificates,
  deleteSelectedCertificate,
}) => {
  return (
    <React.Fragment>
      {selectedCertificates.map((selectedCertificate) => (
        <div key={selectedCertificate}>
          <div styleName="selectedDivItem">{selectedCertificate}</div>
          <div styleName="selectedDivItem">
            <a onClick={() => deleteSelectedCertificate(selectedCertificate)}>
              <i className="fa fa-times"></i>
            </a>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default SelectedCertificates;
