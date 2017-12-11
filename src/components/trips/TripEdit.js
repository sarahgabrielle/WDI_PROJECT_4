import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import TripForm from './TripForm';

import Promise from 'bluebird';

class TripEdit extends React.Component {
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
    const promises = {
      trip: Axios.get(`/api/trips/${this.props.match.params.id}`).then(res => res.data),
      users: Axios.get('/api/users').then(res => res.data)
    };

    Promise.props(promises)
      .then(data => this.setState(data))
      .catch(err => console.error(err));
  }

  handleLocationChange = (resort, accommodation, location) => {
    const trip = Object.assign({}, this.state.trip, { resort, accommodation, location });
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
      .put(`/api/trips/${this.props.match.params.id}`, this.state.trip, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.props.history.push(`/trips/${res.data.id}`))
      .catch(err => console.error(err));
  }

  render() {
    console.log('HERE...');
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
      />
    );
  }
}

export default TripEdit;
