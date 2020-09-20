import React, { Component } from "react";
import withModal from "../withModal";
import "./ImageButtonModal.module.css";

const ImageDisplay = ({ imageUrl }) => {
  return (
    <React.Fragment>
      <img src={imageUrl} styleName="imgDisplay"></img>
    </React.Fragment>
  );
};

const ViewButton = ({ handleClick, buttonText }) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-primary rounded"
    >
      {buttonText}
    </button>
  );
};

export default withModal(ImageDisplay, ViewButton);
