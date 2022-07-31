import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ViewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskLoaded: false
    };
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
        <div className='row'>
          <div className='col'>
            {tasks.map(task =>
            <>
            <div className="card text-bg-light mb-3" key={task.taskId}>
            <div className="card-header">{task.title}</div>
              <div className="card-body">
                <p className="card-text text-center">{task.status}</p>
                <p className='card-text text-center'>{task.notes}</p>
                <i className='bi bi-three-dots-vertical'></i>
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
