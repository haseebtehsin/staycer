import React, { Component } from "react";
import "./TopBar.module.css";
const TopBar = () => {
  return (
    <React.Fragment>
      <div styleName="topBar">
        <div className="d-flex justify-content-end">
          <div className="p-2">
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
