import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handlePasswordChange(event) {
    const { value } = event.target;
    if (value === '') {
      this.setState({
        password: value,
        message: 'Password is required'
      });
      return;
    }
    if (value.length < 8) {
      this.setState({
        password: value,
        message: 'Password must be at least 8 characters long'
      });
      return;
    }
    this.setState({
      password: value,
      message: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = '#';
        }
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit, handlePasswordChange } = this;
    const checkHref = action === 'sign-up' ? '#sign-in' : '#sign-up';
    const actionText = action === 'sign-up' ? 'Sign in instead' : 'Create an Account';
    const submitBtnText = action === 'sign-up' ? 'Create' : 'Log In';
    return (
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            className="form-control bg-light" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password <p className='text-danger'>{this.state.message}</p>
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            className="form-control bg-light" />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small>
            <a className="text-muted" href={checkHref}>
              { actionText }
            </a>
          </small>
          <button type="submit" className="btn btn-primary">
            { submitBtnText }
          </button>
        </div>
      </form>
    );
  }
}

AuthForm.contextType = AppContext;
