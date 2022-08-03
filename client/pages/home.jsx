import React from 'react';
import CreateTask from '../components/task-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import MainNav from '../components/navbar';

export default class Home extends React.Component {

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
