import React, { Component } from "react";
import "./TopBar.module.css";
const TopBar = ({ handleSideNavBarCollapse }) => {
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
          <div className="col-2">
            <div className="dropdown" styleName="settings">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Settings
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
