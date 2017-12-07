import React from 'react';
import Axios from 'axios';

import TripForm from './TripForm';

class TripNew extends React.Component {
  state = {
    trip: {
      country: '',
      resort: '',
      date: '',
      address: '',
      createdBy: '',
      users: []
    },
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    const trip = Object.assign({}, this.state.trip, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ trip, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/trips', this.state.trip)
      .then(() => this.props.history.push('/trips/:id'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
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
