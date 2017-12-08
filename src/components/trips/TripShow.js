import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class TripShow extends React.Component{
  state = {
    trip: {},
    user: Auth.getPayload()
  }

  componentWillMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.error(err));
  }

  render(){
    console.log(this.state.trip);
    return(
      <div className="row">
        <div className="col-lg-4">
          <h1>Trip Show Page</h1>
          <button>MAP</button>
          <button>DASHBOARD</button>
          <button>MESSAGES</button>
          <button>MEMORIES</button>
          <button>PROFILE</button>
          <Link to={`/users/${this.state.user.userId}`} className="main-button">PROFILE
          </Link>
        </div>
      </div>
    );
  }
}

export default TripShow;
