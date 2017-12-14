import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import GoogleMap from '../../components/GoogleMap';

class TripShow extends React.Component{
  state = {
    trip: null,
    user: Auth.getPayload(),
    open: false
  }

  componentWillMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.error(err));
  }

  render(){
    function openNav() {
      document.getElementById('mySidenav').style.width = '250px';
    }

    function closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    }

    if (!this.state.trip) return null;
    return(
      <div>
        <a className="fa fa-bars fa-lg sidebar-link" onClick={() => openNav()}></a>
        <GoogleMap resortLocation={this.state.trip.resortLocation} accommodationLocation={this.state.trip.accommodationLocation} />
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
          <a href={`/trips/${this.state.trip.id}/dashboard`}>Dashboard</a>
          <a href={`/trips/${this.state.trip.id}/messages`}>Messages</a>
          <a href={`/trips/${this.state.trip.id}/memories`}>Memories</a>
          {/* <a href={`/trips/${this.state.trip.id}`}>Map</a> */}
          <a href={`/users/${this.state.user.userId}`}>Profile</a>
        </div>
      </div>
    );
  }
}

export default TripShow;
