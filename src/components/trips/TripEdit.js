import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import TripForm from './TripForm';

class TripEdit extends React.Component {
  state = {
    trip: {
      country: '',
      resort: '',
      date: '',
      address: '',
      createdBy: '',
      users: []
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const trip = Object.assign({}, this.state.trip, { [name]: value });
    this.setState({ trip });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/trips/${this.props.match.params.id}`, this.state.trip, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.props.history.push(`/trips/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <TripForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        trip={this.state.trip}
      />
    );
  }
}

export default TripEdit;
