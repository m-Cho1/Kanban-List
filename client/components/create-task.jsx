import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ViewTask from './task-list';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      status: '',
      notes: '',
      isOpen: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleShow() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  handleSubmit(event) {
    if (this.state.title === '' || this.state.status === '') {
      alert('Title or status is required field');
      return;
    }
    // console.log('values:', this.state);
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/tasks', req)
      .then(res => res.json())
      .then(result => {
        console.log('result:', result);
      });
    this.setState({
      title: '',
      status: '',
      notes: '',
      isOpen: false
    });
  }

  render() {
    const { handleShow, handleClose, handleChange, handleSubmit } = this;
    return (
    <>
    <ViewTask />
    <Button variant="primary" onClick={handleShow}>
        Create a Task
      </Button>

      <Form>
        <Modal className='mt-5' show={this.state.isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className='mb-3' controlId='formTitle'>
          <Form.Label className='fw-bold text-decoration-underline'>Title</Form.Label>
          <Form.Control
          required
          type='text'
          placeholder='Task title here:'
          name='title'
          value={this.state.title}
          onChange={handleChange}
          />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formStatus'>
            <Form.Label className='fw-bold text-decoration-underline'>Status</Form.Label>
            {['radio'].map(type => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      required
                      inline
                      label='Todo'
                      name='status'
                      value='todo'
                      type={type}
                      id={`inline-${type}-1`}
                      onChange={handleChange}
                    />
                    <Form.Check
                      required
                      inline
                      label='In Progress'
                      name='status'
                      value='in-progress'
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={handleChange}
                    />
                    <Form.Check
                      required
                      inline
                      label='Urgent'
                      name='status'
                      value='urgent'
                      type={type}
                      id={`inline-${type}-3`}
                      onChange={handleChange}
                    />
                  </div>
            ))}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formNotes'>
            <Form.Label className='fw-bold text-decoration-underline'>Notes</Form.Label>
            <Form.Control
            as='textarea'
            rows='4'
            name='notes'
            placeholder='Notes here:'
            value={this.state.notes}
            onChange={handleChange}
            />
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
    );
  }

}
