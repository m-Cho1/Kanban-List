import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ViewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskLoaded: false
    };
    this.handleIcon = this.handleIcon.bind(this);
  }

  handleIcon() {
    // change icons based on status
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('react-context-jwt')
      }
    };
    fetch('/api/tasks/1', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          tasks: result.loadData,
          taskLoaded: true
        });
        console.log('result:', result.loadData);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { taskLoaded, tasks } = this.state;
    if (!taskLoaded) return <div><h1>loading...</h1></div>;
    return (
      <div>
        render tasks here:

        {tasks.map(task =>
          <div key={task.taskId}>
            Title: {task.title}
            Status: {task.status}
            Notes: {task.notes}
          </div>
        )}
        <div className='row'>
          <div className='col'>
            <div className="card text-bg-light mb-3" >
              <div className="card-header"><i className='bi bi-hourglass-split'></i>Title here:</div>
                <div className="card-body">
                  <p className="card-text text-center">status here:</p>
                  <p className='card-text text-center'>notes here:</p>
                  <i className='bi bi-three-dots-vertical'></i>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
