import React, { useState } from "react";
import "./ImageModal.css";
import Modal from "react-bootstrap/Modal";

const ImageModal = ({ imageUrl }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <a onClick={handleShow}>
        <img src={imageUrl} styleName="imgDisplay"></img>
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img styleName="imgModal" src={imageUrl}></img>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ImageModal;
