import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserRoutes from './components/users/UserRoutes';

import 'bootstrap-css-only';
import 'react-bootstrap';
import 'react-router-bootstrap';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar />
            <h1>WDI Project 4: MERN Stack App</h1>
          </header>
          <main>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <UserRoutes />
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
