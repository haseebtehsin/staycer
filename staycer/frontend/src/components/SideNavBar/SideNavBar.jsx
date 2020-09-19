import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideNavBar.sass";
function SideNavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  };
  return (
    <React.Fragment>
      <button className="btn btn-primary" onClick={toggleCollapse}>
        <i className="fa fa-bars"></i>
      </button>
      <ProSidebar collapsed={collapsed}>
        <Menu iconShape="square">
          <MenuItem icon={<FaUserCircle />}>
            Employees
            <NavLink to="/employees" />
          </MenuItem>
        </Menu>
        <Menu iconShape="square">
          <MenuItem icon={<HiOutlineDocumentReport />}>
            Risk Report
            <NavLink to="/risk" />
          </MenuItem>
        </Menu>
        <Menu iconShape="square">
          <MenuItem icon={<AiOutlineSchedule />}>
            Schedule
            <NavLink to="/schedule" />
          </MenuItem>
        </Menu>
      </ProSidebar>
    </React.Fragment>
  );
}

export default SideNavBar;
