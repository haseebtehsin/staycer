import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageModal from "../common/ImageModal/ImageModal";
import EditCertification from "../EditCertification";
import http from "../../services/httpService";
import apiEndPoints from "../../config/apiEndPoints";
import "./EmployeeCertificationItem.module.css";

function EmployeeCertificationItem({
  certification: certificationFromProp,
  employeeId,
  handleCertificationDelete,
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
        tracking: data.tracking,
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

  const updateTracking = async () => {
    const response = await http.patch(
      apiEndPoints.userCertificationResource(employeeId, certification.id),
      { tracking: !certification.tracking }
    );

    if (response.status === 200) {
      updateCertification({
        ...certification,
        tracking: !certification.tracking,
      });
    }
  };

  const renderCertificationTracking = () => {
    const isCertificationTracked = certification.tracking;
    const renderIcon = isCertificationTracked ? "check-square" : "times-circle";
    const iconColor = isCertificationTracked ? "green" : "red";
    return (
      <button className="btn" onClick={updateTracking}>
        <i
          className={`fa fa-2x fa-${renderIcon}`}
          style={{ color: `${iconColor}` }}
        ></i>
      </button>
    );
  };

  const emptyCertificationUrl = "/static/emptyCertification.png";
  const certificationPicture = certification.picture
    ? certification.picture
    : emptyCertificationUrl;

  return (
    <React.Fragment>
      <div
        className="row d-flex justify-content-between"
        styleName="certificationItem"
      >
        <div className="col-2">
          <div styleName="certificationPicture">
            <ImageModal imageUrl={certificationPicture} />
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
            <div styleName="certificationDescriptionField">Tracking</div>
            <div styleName="certificationDescriptionValue">
              {renderCertificationTracking()}
            </div>
          </div>
        </div>
        <div className="col-2">{renderCertificationStatus()}</div>
        <div className="col-1 offset-md-3">
          <button
            onClick={() => handleCertificationDelete(certification.id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
        <div className="col-1 ">
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

EmployeeCertificationItem.propTypes = {
  certification: PropTypes.object,
  employeeId: PropTypes.number,
  handleCertificationDelete: PropTypes.func.isRequired,
};

export default EmployeeCertificationItem;
