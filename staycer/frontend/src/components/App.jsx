import React, { Component } from "react";
import ReactDOM from "react-dom";
import CreateUser from "./CreateUser";

class App extends Component {
  render() {
    return (
      <div className="container">
        <CreateUser />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
