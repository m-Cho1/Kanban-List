import React from 'react';
import CreateTask from '../components/create-task';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import MainNav from '../components/navbar';

export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
    <div>
      <MainNav />
      <CreateTask />
    </div>
    );
  }

}

Home.contextType = AppContext;
