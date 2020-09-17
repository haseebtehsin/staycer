import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function withModal(ComponentToRender, ButtonComponent, title) {
  return class WithModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: false,
      };

      this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
      this.setState({ showModal: false });
    };

    handleOpen = () => {
      this.setState({ showModal: true });
    };

    render() {
      return (
        <React.Fragment>
          <ButtonComponent {...this.props} handleClick={this.handleOpen} />
          {this.state.showModal ? (
            <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ComponentToRender
                  {...this.props}
                  handleModalClose={this.handleClose}
                />
                {/* <Button className="btn btn-primary" onClick={this.handleClose}>
                  Cancel
                </Button> */}
              </Modal.Body>
              <Modal.Footer>
                {/* 
            <Button variant="primary" onClick={doSubmit}>
              Save Changes
            </Button> */}
              </Modal.Footer>
            </Modal>
          ) : null}
        </React.Fragment>
      );
    }
  };
}

export default withModal;
