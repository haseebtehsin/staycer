import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
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
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdWork } from "react-icons/md";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideNavBar.sass";
import "./SideNavBar.css";
// import "./SideNavBar.module.css";
function SideNavBar({ sideBarCollapse }) {
  const [activeMenu, updateActiveMenu] = useState("employees");
  const history = useHistory();
  const staycerLogoUrl = "/static/staycerLogo.png";
  const handleClick = (menuItem) => {
    updateActiveMenu(menuItem);
    history.push(`/${menuItem}`);
  };
  const handleToggle = (value) => {
    console.log(`${value} toggled`);
  };
  return (
    <React.Fragment>
      <ProSidebar collapsed={sideBarCollapse}>
        <SidebarHeader>
          <div className="row justify-content-center align-items-center">
            <NavLink to="/" className="col-8">
              <div className="row justify-content-center align-items-center">
                <div className={`p-0 ${sideBarCollapse ? "col-12" : "col-6"}`}>
                  <img
                    src={staycerLogoUrl}
                    className="sideNavBarHeaderLogo"
                  ></img>
                </div>
                {!sideBarCollapse ? (
                  <div className="col-6 justify-content-start sideNavBarHeaderStaycerText">
                    Staycer
                  </div>
                ) : null}
              </div>
            </NavLink>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<BiBarChartAlt2 />}
              active={activeMenu === "dashboard" ? true : false}
            >
              Dashboard
              <a
                onClick={() => {
                  handleClick("dashboard");
                }}
              />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaUserCircle />}
              active={activeMenu === "employees" ? true : false}
            >
              Employees
              <a
                onClick={() => {
                  handleClick("employees");
                }}
              />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<HiOutlineDocumentReport />}
              active={activeMenu === "certification" ? true : false}
            >
              Certifications
              <a
                onClick={() => {
                  handleClick("certification");
                }}
              />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdWork />}
              active={activeMenu === "project" ? true : false}
            >
              Projects
              <a
                onClick={() => {
                  handleClick("project");
                }}
              />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <MenuItem
              icon={<AiOutlineSchedule />}
              active={activeMenu === "schedule" ? true : false}
            >
              Schedule
              <a
                onClick={() => {
                  handleClick("schedule");
                }}
              />
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </React.Fragment>
  );
}

export default SideNavBar;
