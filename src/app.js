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
import DashBoard from './components/trips/SideNav/DashBoard';
import Messages from './components/trips/SideNav/Messages';
import Memories from './components/trips/SideNav/Memories';

// import 'react-select/dist/react-select.css';
// import 'bootstrap-css-only';
// import 'react-bootstrap';
// import 'react-router-bootstrap';
// import './scss/style.scss';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      ...green,
      A400: '#00e677'
    },
    error: red
  }
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
