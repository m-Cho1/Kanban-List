import React from 'react';
import HelloWorld from '../components/hello-world';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Navbar from '../components/navbar';

export default class Home extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
    <div>
      <Navbar />
      <HelloWorld />
    </div>
    );
  }

}

Home.contextType = AppContext;
