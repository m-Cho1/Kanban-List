import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      status: '',
      notes: '',
      tasks: [],
      taskLoaded: false,
      isOpen: false,
      isEditing: false,
      editTask: null,
      editingTaskId: null
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  handleEditTask(taskId) {
    const editTaskId = parseInt(taskId.target.getAttribute('data-task'));
    const editingTask = this.state.tasks.filter(task => { return task.taskId === parseInt(editTaskId); });

    this.setState({
      isOpen: true,
      isEditing: true,
      editTask: editingTask,
      editingTaskId: editTaskId,
      title: editingTask[0].title,
      status: editingTask[0].status.value,
      notes: editingTask[0].notes
    });

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
    this.setState({
      isOpen: false,
      isEditing: false
    });
  }

  handleSubmit(event) {
    if (this.state.title === '' || this.state.status === '') {
      alert('Title or status is required field');
      return;
    }

    if (!this.state.isEditing) {
      event.preventDefault();
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('task-jwt')
        },
        body: JSON.stringify(this.state)
      };
      fetch('/api/tasks', req)
        .then(res => res.json())
        .then(result => {
          this.setState({
            tasks: [result, ...this.state.tasks],
            isOpen: false
          });
        // console.log('result:', result);
        });
      this.setState({
        title: '',
        status: '',
        notes: ''
      });
    } else {
      const editTaskId = parseInt(event.target.getAttribute('data-task'));
      const matchTaskIndex = this.state.tasks.findIndex(task => task.taskId === editTaskId);

      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('task-jwt')
        },
        body: JSON.stringify(this.state)
      };
      fetch(`/api/tasks/${editTaskId}`, req)
        .then(res => res.json())
        .then(result => {
          const tasksCopy = [...this.state.tasks];
          tasksCopy[matchTaskIndex] = result;
          tasksCopy.splice(matchTaskIndex, 1);
          tasksCopy.unshift(result);

          this.setState({
            tasks: tasksCopy,
            title: '',
            status: '',
            notes: '',
            isOpen: false,
            isEditing: false,
            editTask: null,
            editingTaskId: null
          });
        })
        .catch(err => console.error(err));
    }

  }

  // for rendering data to page:
  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('task-jwt')
      }
    };
    fetch('/api/tasks/', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          tasks: result.loadData,
          taskLoaded: true
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let formTitle = 'New Task';
    const { taskLoaded, isEditing } = this.state;
    const { handleShow, handleClose, handleChange, handleSubmit, handleEditTask } = this;
    if (!taskLoaded) return <div><h1>loading...</h1></div>;
    if (isEditing) {
      formTitle = 'Edit Task';
    }
    return (
    <>
    <>
      {this.state.tasks.map(task =>
        <div className="card text-bg-light mb-3" key={task.taskId} id={task.taskId}>
          <div className="card-header">{task.title}</div>
            <div className="card-body">
            <p className="card-text text-center">{task.status}</p>
            <p className='card-text text-center'>{task.notes}</p>
            <i
            className='bi bi-three-dots-vertical'
            data-task={task.taskId}
            onClick={handleEditTask}></i>
            </div>
        </div>
      )}
      </>

    <Button variant="primary" onClick={handleShow}>
        Create a Task
      </Button>

      <Form>
        <Modal className='mt-5' show={this.state.isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{formTitle}</Modal.Title>
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
                      value='Todo'
                      type={type}
                      id={`inline-${type}-1`}
                      onChange={handleChange}
                    />
                    <Form.Check
                      required
                      inline
                      label='In Progress'
                      name='status'
                      value='In-progress'
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={handleChange}
                    />
                    <Form.Check
                      required
                      inline
                      label='Urgent'
                      name='status'
                      value='Urgent'
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
            <Button variant="primary" onClick={handleSubmit} data-task={this.state.editingTaskId}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
    );
  }

}
