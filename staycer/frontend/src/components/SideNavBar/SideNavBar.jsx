import React, { Component } from "react";
import "./SideNavBar.css";
import SideNavBarItem from "./SideNavBarItem";

class SideNavBar extends Component {
  state = {
    navItems: [
      {
        mainItem: "Employees",
        subItems: [],
        isActive: false,
        routerLink: "/employees",
      },
      {
        mainItem: "Schedule",
        subItems: [],
        isActive: false,
        routerLink: "/schedule",
      },
      {
        mainItem: "Projects",
        subItems: [],
        isActive: false,
        routerLink: "/projects",
      },
    ],
  };

  handleSelect = (navMainItem) => {
    const { navItems } = this.state;

    navItems.forEach((navItem) => {
      if (navItem.mainItem === navMainItem) navItem.isActive = true;
      else navItem.isActive = false;
    });
    this.setState({ navItems: navItems });
  };

  render() {
    const { navItems } = this.state;
    return (
      <React.Fragment>
        <div styleName="wrapper">
          <nav styleName="sidebar">
            <div>
              <h3>Staycer Sidebar</h3>
            </div>
            <ul className="list-unstyled components">
              {navItems.map((navItem) => (
                <SideNavBarItem
                  key={navItem.mainItem}
                  navMainItem={navItem.mainItem}
                  navSubItems={navItem.subItems}
                  isActive={navItem.isActive}
                  handleSelect={this.handleSelect}
                  routerLink={navItem.routerLink}
                />
              ))}
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default SideNavBar;
