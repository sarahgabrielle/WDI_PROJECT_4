import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { AppBar } from 'material-ui';

const Navbar = ({ history }) => {
  function logout(e){
    e.preventDefault();

    Auth.removeToken();
    history.push('/');
  }

  return(
    <AppBar position="static">
      { !Auth.isAuthenticated() && <Link to="/login" className="standard-button">Login</Link>}
      {' '}
      { !Auth.isAuthenticated() && <Link to="/register" className="standard-button">Register</Link>}
      {' '}
      { Auth.isAuthenticated() && <Link to="/users/:id" className="standard-button">Profile</Link>}
      {' '}
      { Auth.isAuthenticated() && <a href="#" className="standard-button" onClick={logout}>Logout</a>}
    </AppBar>
  );
};


export default withRouter(Navbar);
