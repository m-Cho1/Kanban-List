import React from 'react';
import CreateTask from '../components/create-task';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import MainNav from '../components/navbar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: null
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {

  }

  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
    <div>
      <MainNav />
      <div className='container-sm'>
        <div className='row'>
          <div className='d-grid gap-2'>
            <CreateTask />
          </div>
        </div>
      </div>

    </div>
    );
  }

}

Home.contextType = AppContext;
