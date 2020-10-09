import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { capitalize } from "../../../utils/utils";
import "./TopBar.module.css";

const TopBar = ({ handleSideNavBarCollapse, user }) => {
  const defaultAvatarUrl = "/static/defaultAvatar.png";
  const userImageUrl = user.profile?.picture
    ? user.profile.picture
    : defaultAvatarUrl;
  const userFirstName = user.profile?.first_name
    ? capitalize(user.profile.first_name)
    : "";
  const userLastName = user.profile?.last_name
    ? capitalize(user.profile.last_name)
    : "";
  const userName = `${userFirstName} ${userLastName}`;
  return (
    <React.Fragment>
      <div>
        <div
          className="row justify-content-between align-items-center"
          styleName="topBar"
        >
          <div className="col-2">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleSideNavBarCollapse();
              }}
            >
              <i className="fa fa-2x fa-bars"></i>
            </a>
          </div>

          <div className="col-4">
            <div className="d-flex flex-row align-items-center justify-content-end">
              <div className="p-2">
                <span>{userName}</span>
              </div>
              <div className="dropdown p-2" styleName="settings">
                <i
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* <i class="fa fa-cog"></i> */}
                </i>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="dropdown-item">Profile</div>
                  <NavLink className="dropdown-item" to="/logout">
                    Logout
                  </NavLink>
                </div>
              </div>
              <div className="p-2">
                <img src={userImageUrl} styleName="userProfileImage"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
