import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageModal from "../common/ImageModal/ImageModal";
import EditCertification from "../EditCertification";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import "./CertificationItem.module.css";

function CertificationItem({
  certification: certificationFromProp,
  employeeId,
}) {
  const [certification, updateCertification] = useState(certificationFromProp);

  const currentDate = new Date();
  const fetchCertification = async () => {
    console.log("fetching updated certification");
    const response = await http.get(
      apiEndPoints.userCertificationResource(employeeId, certification.id)
    );
    if (response.status === 200) {
      console.log("updated certification received");
      const { data } = response;
      const updatedCertificationItem = {
        ...certification,
        issue_date: data.issue_date,
        expiry_date: data.expiry_date,
        validated: data.validated,
        picture: data.picture,
      };
      updateCertification(updatedCertificationItem);
    }
  };

  const renderCertificationStatus = () => {
    const certificationExpiryDate = new Date(certification.expiry_date);
    const isExpired = certificationExpiryDate < currentDate;
    const badgeClass = isExpired ? "danger" : "success";
    const badgeText = isExpired ? "expired" : "active";
    return <span className={`badge badge-${badgeClass}`}>{badgeText}</span>;
  };

  const renderCertificationValidated = () => {
    const isCertificationValidated = certification.validated;
    const renderIcon = isCertificationValidated
      ? "check-square"
      : "times-circle";
    const iconColor = isCertificationValidated ? "green" : "red";
    return (
      <i
        className={`fa fa-${renderIcon}`}
        style={{ color: `${iconColor}` }}
      ></i>
    );
  };

  return (
    <React.Fragment>
      <div
        className="row d-flex justify-content-between"
        styleName="certificationItem"
      >
        <div className="col-2">
          <div style={{ width: "200px", height: "120px" }}>
            <ImageModal imageUrl={certification.picture} />
          </div>
        </div>
        <div className="col-3">
          <div>
            <div styleName="certificationName">
              {certification.certificate.name}
            </div>
          </div>
          <div>
            <div styleName="certificationDescriptionField">Issue Date</div>
            <div styleName="certificationDescriptionValue">
              {certification.issue_date}
            </div>
          </div>
          <div>
            <div styleName="certificationDescriptionField">Expiry Date</div>
            <div styleName="certificationDescriptionValue">
              {certification.expiry_date}
            </div>
          </div>
          <div>
            <div styleName="certificationDescriptionField">Validated</div>
            <div styleName="certificationDescriptionValue">
              {renderCertificationValidated()}
            </div>
          </div>
        </div>
        <div className="col-2">{renderCertificationStatus()}</div>
        <div className="col-1 offset-md-2">
          <EditCertification
            certification={certification}
            employeeId={employeeId}
            handleCertificationUpdate={fetchCertification}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

CertificationItem.propTypes = {
  certification: PropTypes.object,
  employeeId: PropTypes.number,
};

export default CertificationItem;
