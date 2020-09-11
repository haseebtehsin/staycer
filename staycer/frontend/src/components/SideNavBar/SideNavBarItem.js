import React from "react";
import PropTypes from "prop-types";
import "./SideNavBar.css";
import { NavLink } from "react-router-dom";

function SideNavBarItem({
  navMainItem,
  navSubItems,
  isActive,
  handleSelect,
  routerLink,
}) {
  return (
    <React.Fragment>
      <li styleName={isActive ? "activetab" : ""}>
        <NavLink
          // href={"#" + navMainItem}
          to={routerLink}
          data-toggle="collapse"
          aria-expanded="false"
          className={navSubItems.length > 0 ? "dropdown-toggle" : ""}
          onClick={() => handleSelect(navMainItem)}
        >
          {navMainItem}
        </NavLink>

        {/* sub menu code */}
        {/* {navSubItems.length > 0 ? (
          <ul className="collapse list-unstyled" id={navMainItem}>
            {navSubItems.map((navSubItem) => (
              <li key={navSubItem}>
                <a href="#">{navSubItem}</a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )} */}
      </li>
    </React.Fragment>
  );
}

SideNavBarItem.propTypes = {
  navMainItem: PropTypes.string,
  navSubItems: PropTypes.array,
  handleSelect: PropTypes.func,
  routerLink: PropTypes.string,
};

export default SideNavBarItem;
