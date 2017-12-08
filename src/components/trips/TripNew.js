import React from 'react';
import Axios from 'axios';

import TripForm from './TripForm';
import Auth from '../../lib/Auth';

let currentUser = '';

class TripNew extends React.Component {
  state = {
    trip: {
      country: '',
      resort: '',
      date: '',
      address: '',
      createdBy: {},
      users: []
    },
    errors: {}
  };



  handleChange = ({ target: { name, value } }) => {
    const trip = Object.assign({}, this.state.trip, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    currentUser = Auth.getPayload().userId;
    console.log(currentUser);

    this.setState({ trip, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = Object.assign({}, this.state.trip.users.push(currentUser));
    this.setState({newTrip});
    Axios
      .post('/api/trips', this.state.trip)
      .then((res) => this.props.history.push(`/trips/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.trip);
    return (
      <TripForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        trip={this.state.trip}
        errors={this.state.errors}
      />
    );
  }
}

export default TripNew;
