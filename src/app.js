import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/utility/LandingPage';
import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserRoutes from './components/users/UserRoutes';
import TripRoutes from './components/trips/TripRoutes';

import 'react-select/dist/react-select.css';
import 'bootstrap-css-only';
import 'react-bootstrap';
import 'react-router-bootstrap';
import './scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <UserRoutes />
              <TripRoutes />
            </Switch>
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
