import React from 'react';
import Axios from 'axios';

import TripForm from './TripForm';
import Auth from '../../lib/Auth';

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

  addMember = (member) => {
    const user = this.state.users.find(user => user.username === member);
    const users = this.state.trip.users.concat(user);
    const trip = Object.assign({}, this.state.trip, { users });
    if(user) this.setState({ trip });
  };

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
        errors={this.state.errors}
        users={this.state.users}
        addMember={this.addMember}
        handleUser={this.handleUser}
        selectedOptions={this.state.selectedOptions}
      />
    );
  }
}

export default TripNew;
