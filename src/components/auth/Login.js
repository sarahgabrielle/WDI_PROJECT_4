import React from 'react';
import Axios from 'axios';

import LoginForm from './LoginForm';
import Auth from '../../lib/Auth';

class Login extends React.Component {
  state = {
    user: {
      identifier: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        const { userId } = Auth.getPayload();
        this.props.history.push(`/users/${userId}`);
      })
      .catch(err => console.log(err.response.data.errors));
  }

  render() {
    return (
      <LoginForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
