import React, { Component, useCallback } from "react";
import "./SearchBar.module.css";
import PropTypes from "prop-types";

function SearchBar({ onSearch }) {
  const delayedOnSearch = useCallback(
    _.debounce((q) => onSearch(q), 500),
    []
  );

  const onChange = (e) => {
    delayedOnSearch(e.target.value);
  };
  return (
    <div className="main">
      <div className="form-group" styleName="has-search">
        <span className="fa fa-search" styleName="form-control-feedback"></span>
        <input
          type="text"
          onChange={onChange}
          styleName="form-control"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
