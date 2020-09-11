import React, { Component } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";

class SearchBar extends Component {
  state = {};
  onChange = (e) => {
    this.props.onSearch(e.target.value);
  };
  render() {
    return (
      <div className="main">
        <div className="form-group" styleName="has-search">
          <span
            className="fa fa-search"
            styleName="form-control-feedback"
          ></span>
          <input
            type="text"
            onChange={this.onChange}
            styleName="form-control"
            placeholder="Search"
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
