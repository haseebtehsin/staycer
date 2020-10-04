import React, { Component } from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import TopBar from "./TopBar/TopBar";
import ContentView from "./ContentView";

class Main extends Component {
  state = { sideBarCollapse: false };
  handleSideNavBarCollapse = () => {
    console.log("collpasing");
    this.setState({ sideBarCollapse: !this.state.sideBarCollapse });
  };

  render() {
    const { sideBarCollapse } = this.state;
    return (
      <React.Fragment>
        <div className="row h-100">
          <div className={`sideNavBar ${sideBarCollapse ? "col-1" : "col-2"}`}>
            <SideNavBar
              sideBarCollapse={sideBarCollapse}
              handleSideNavBarCollapse={this.handleSideNavBarCollapse}
            />
          </div>
          <div
            className={`topRowContent ${sideBarCollapse ? "col-11" : "col-10"}`}
          >
            <TopBar handleSideNavBarCollapse={this.handleSideNavBarCollapse} />
            <div className="mainContent">
              <ContentView />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
