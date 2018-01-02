import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Auth from '../../lib/Auth';
import '../../scss/NavBar.scss';

const NavBar = ({ history }) => {
  function logout(e){
    e.preventDefault();

    Auth.removeToken();
    history.push('/');
  }

  return(
    <div className="root">
      <img src="../../assets/snow-mountain.png" alt="Logo here" className="logo"/>
      { !Auth.isAuthenticated() && <Link to="/login" className="navLink">Login</Link>}
      {' '}
      { !Auth.isAuthenticated() && <Link to="/register" className="navLink">Register</Link>}
      {' '}
      { Auth.isAuthenticated() && <a href="#" className="navLink" onClick={logout}>Logout</a>}
    </div>
  );
};

export default withRouter(NavBar);
