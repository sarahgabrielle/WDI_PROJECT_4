import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/utility/LandingPage';
import Navbar from './components/utility/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserRoutes from './components/users/UserRoutes';
import TripEdit from './components/trips/TripEdit';
import TripShow from './components/trips/TripShow';
import TripNew from './components/trips/TripNew';
import DashBoard from './components/trips/SideNav/Dashboard';
import Messages from './components/trips/SideNav/Messages';
import Memories from './components/trips/SideNav/Memories';

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
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <UserRoutes />
            <Switch>
              <Route path="/trips/new" component={TripNew} />
              <Route path="/trips/:id/dashboard" component={DashBoard} />
              <Route path="/trips/:id/messages" component={Messages} />
              <Route path="/trips/:id/memories" component={Memories} />
              <Route path="/trips/:id/edit" component={TripEdit} />
              <Route path="/trips/:id" component={TripShow} />
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
