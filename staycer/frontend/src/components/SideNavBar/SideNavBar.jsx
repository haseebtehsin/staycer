import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideNavBar.sass";
import "./SideNavBar.css";
// import "./SideNavBar.module.css";
function SideNavBar() {
  const staycerLogoUrl = "/static/staycerLogo.png";
  return (
    <React.Fragment>
      <ProSidebar>
        <SidebarHeader>
          <div className="sideNavBarHeaderLogo">
            <img src={staycerLogoUrl} width="60px" height="60px"></img>
          </div>
          <div className="sideNavBarHeaderStaycerText"> Staycer </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaUserCircle />}>
              Employees
              <NavLink to="/employees" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem icon={<HiOutlineDocumentReport />}>
              Certification
              <NavLink to="/certification" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem icon={<AiOutlineSchedule />}>
              Schedule
              <NavLink to="/schedule" />
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </React.Fragment>
  );
}

export default SideNavBar;
