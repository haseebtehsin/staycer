import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function withModal(Component, title) {
  return class WithModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: true,
      };

      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
      this.setState({ showModal: false });
      this.props.history.goBack();
    }

    render() {
      if (this.state.showModal) {
      }
      return (
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Component handleModalClose={this.handleClose} />
            <Button className="btn btn-primary" onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Body>
          <Modal.Footer>
            {/* 
            <Button variant="primary" onClick={doSubmit}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      );
    }
  };
}

export default withModal;
