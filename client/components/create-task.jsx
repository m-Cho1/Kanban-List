import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { handleShow, handleClose } = this;
    return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Create a Task
      </Button>

      <Modal show={this.state.isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>This will be form</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }

}
