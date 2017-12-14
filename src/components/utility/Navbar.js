import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import '../../scss/NavBar.scss';

const Navbar = ({ history }) => {
  function logout(e){
    e.preventDefault();

    Auth.removeToken();
    history.push('/');
  }

  return(
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className="logo">
            {/* <i className="fa fa-snowflake-o" aria-hidden="true"></i> */}
            <img src="../../assets/snow-mountain.png" alt="Logo here" className="logo"/>
          </Typography>
          { !Auth.isAuthenticated() && <Link to="/login" className="navLink">Login</Link>}
          {' '}
          { !Auth.isAuthenticated() && <Link to="/register" className="navLink">Register</Link>}
          {' '}
          { Auth.isAuthenticated() && <Link to="/users/:id" className="navLink">Profile</Link>}
          {' '}
          { Auth.isAuthenticated() && <a href="#" className="navLink" onClick={logout}>Logout</a>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
