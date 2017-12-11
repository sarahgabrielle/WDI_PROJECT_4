import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import TripForm from './TripForm';

class TripNew extends React.Component {
  state = {
    trip: {
      resort: '',
      resortLocation: {
        lat: '',
        lng: ''
      },
      date: '',
      accommodation: '',
      accommodationLocation: {
        lat: '',
        lng: ''
      },
      createdBy: '',
      users: []
    },
    errors: {},
    users: [],
    selectedOptions: []
  };

  componentDidMount() {
    Axios
      .get('/api/users')
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.error(err));
  }

  handleResortLocationChange = (place, location) => {
    const trip = Object.assign({}, this.state.trip, { resort: place, resortLocation: location });
    this.setState({ trip });
  }

  handleAccomodationLocationChange = (place, location) => {
    const trip = Object.assign({}, this.state.trip, { accommodation: place, accommodationLocation: location });
    this.setState({ trip });
  }

  handleUser = (selectedOptions) => {
    const users = selectedOptions.map(selectedOption => ({ _id: selectedOption.value, username: selectedOption.label }));
    const trip = Object.assign({}, this.state.trip, { users });
    this.setState({ trip, selectedOptions });
  }

  handleChange = ({ target: { name, value } }) => {
    const trip = Object.assign({}, this.state.trip, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ trip, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/trips', this.state.trip, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then((res) => this.props.history.push(`/trips/${res.data.id}`))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <TripForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        trip={this.state.trip}
        users={this.state.users}
        errors={this.state.errors}
        handleUser={this.handleUser}
        selectedOptions={this.state.selectedOptions}
        handleResortLocationChange={this.handleResortLocationChange}
        handleAccomodationLocationChange={this.handleAccomodationLocationChange}
      />
    );
  }
}

export default TripNew;
