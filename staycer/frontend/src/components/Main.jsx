import React, { Component } from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import TopBar from "./TopBar/TopBar";
import ContentView from "./ContentView";
import { Redirect, Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import auth from "../services/authService";
import Logout from "../Logout";
import Spinner from "./common/Spinner";

class Main extends Component {
  state = {
    sideBarCollapse: false,
    currentUser: undefined,
    isLoadingUser: true,
  };
  handleSideNavBarCollapse = () => {
    this.setState({ sideBarCollapse: !this.state.sideBarCollapse });
  };

  async componentDidMount() {
    // this.setState({ isLoadingUser: true });
    const currentUser = await auth.getCurrentUser();
    if (currentUser) {
      this.setState({ currentUser: currentUser });
    } else {
      auth.removeToken();
    }
    this.setState({ isLoadingUser: false });
  }

  renderMain = () => {
    const { sideBarCollapse } = this.state;
    const { currentUser: user } = this.state;
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
            <TopBar
              handleSideNavBarCollapse={this.handleSideNavBarCollapse}
              user={user}
            />
            <div className="mainContent">
              <ContentView />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { currentUser, isLoadingUser } = this.state;
    // console.log("--------------------");
    // console.log(currentUser);
    // console.log(isLoadingUser);
    // console.log(!currentUser && !isLoadingUser ? "yes" : "no");
    // console.log("--------------------");
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
        </Switch>
        {isLoadingUser ? <Spinner /> : null}
        {!currentUser && !isLoadingUser ? <Redirect to="/login" /> : null}
        {currentUser && !isLoadingUser ? this.renderMain() : null}
      </React.Fragment>
    );
  }
}

export default Main;
