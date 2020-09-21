import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatDate, remainingDays } from "../../../utils/date";
import { capitalize } from "../../../utils/utils";
import UserAvatar from "react-user-avatar";
import ImageButtonModal from "../common/ImageButtonModal/ImageButtonModal";

function CertificationItem({ certification }) {
  const employeeName = `${capitalize(
    certification.user.profile.first_name
  )} ${capitalize(certification.user.profile.last_name)}`;

  const certificationRemainingDays = remainingDays(certification.expiry_date);
  const remainingDaysDisplay =
    certificationRemainingDays <= 0 ? "Expired" : certificationRemainingDays;
  var certificationBadgeClass = "";
  if (certificationRemainingDays <= 0) {
    certificationBadgeClass = "danger";
  } else if (certificationRemainingDays <= 30) {
    certificationBadgeClass = "primary";
  } else if (certificationRemainingDays <= 60) {
    certificationBadgeClass = "info";
  } else if (certificationRemainingDays <= 90) {
    certificationBadgeClass = "warning";
  } else {
    certificationBadgeClass = "success";
  }
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="row">
            <div className="col-2">
              <UserAvatar
                size="32"
                colors={["#20c997"]}
                name={employeeName}
                src={certification.user.profile.picture}
              />
            </div>
            <div className="col-7">
              <NavLink to={`/employees/${certification.user.id}`}>
                {employeeName}
              </NavLink>
            </div>
          </div>
        </td>
        <td>{certification.certificate.name}</td>
        <td>{certification.certificate.institute.name}</td>
        <td>{formatDate(certification.issue_date)}</td>
        <td>{formatDate(certification.expiry_date)}</td>
        <td>
          <span className={`badge badge-${certificationBadgeClass}`}>
            {remainingDaysDisplay}
          </span>
        </td>
        <td>
          {certification.picture ? (
            <ImageButtonModal
              imageUrl={certification.picture}
              buttonText="View"
            />
          ) : (
            "None"
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

CertificationItem.propTypes = {
  certification: PropTypes.object,
};

export default CertificationItem;
