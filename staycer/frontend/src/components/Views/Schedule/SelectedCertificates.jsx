import React from "react";
import "./SelectedCertificates.module.css";
const SelectedCertificates = ({
  selectedCertificates,
  deleteSelectedCertificate,
}) => {
  return (
    <React.Fragment>
      <ul className="list-group">
        {selectedCertificates.map((selectedCertificate) => (
          <li
            key={selectedCertificate}
            className="list-group-item"
            styleName="selectedCertificate"
          >
            <div className="d-flex justify-content-between">
              <div>{selectedCertificate}</div>
              <div>
                <a
                  onClick={() => deleteSelectedCertificate(selectedCertificate)}
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default SelectedCertificates;
