import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

// import UserShow from '../users/UserShow';

class TripShow extends React.Component{
  state = {
    trip: {}
  }

  componentWillMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
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
          {/* { this.state.trip && <Link to={`/users/${this.state.trip.createdBy}`} className="main-button"> This is wrong as it will take me back to the user profile of the person who created the trip and not back to my profile!
          PROFILE
          </Link>} */}
        </div>
      </div>
    );
  }
}

export default TripShow;
