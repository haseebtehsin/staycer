import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatDate, remainingDays } from "../../../utils/date";
import { capitalize } from "../../../utils/utils";

function CertificationItem({ certification }) {
  const certificationName = `${capitalize(
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
        <td>{certification.certificate.name}</td>
        <td>{formatDate(certification.issue_date)}</td>
        <td>{formatDate(certification.expiry_date)}</td>
        <td>
          <span className={`badge badge-${certificationBadgeClass}`}>
            {remainingDaysDisplay}
          </span>
        </td>
        <td>
          <NavLink to={`/employees/${certification.user.id}`}>
            {certificationName}
          </NavLink>
        </td>
      </tr>
    </React.Fragment>
  );
}

CertificationItem.propTypes = {
  certification: PropTypes.object,
};

export default CertificationItem;
