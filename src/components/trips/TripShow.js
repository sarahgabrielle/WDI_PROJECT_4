import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import GoogleMap from '../../components/GoogleMap';

class TripShow extends React.Component{
  state = {
    trip: null,
    user: Auth.getPayload()
  }

  componentWillMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .then(res => {
        this.setState({ trip: res.data });

        return Axios
          .get(`https://api.weatherunlocked.com/api/snowreport/${RESORT_ID}?app_id=${APP_ID}&app_key=${APP_KEY}`)
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render(){
    if (!this.state.trip) return null;
    console.log(this.state.trip.resortLocation);
    return(
      <GoogleMap resortLocation={this.state.trip.resortLocation} accommodationLocation={this.state.trip.accommodationLocation} />
      /* <div className="row">
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
      </div> */
    );
  }
}

export default TripShow;
