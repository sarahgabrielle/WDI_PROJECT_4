import React from 'react';
import Axios from 'axios';
import Auth from '../../../lib/Auth';
import MemoriesForm from './MemoriesForm';
import BackButton from '../../utility/BackButton';

class Memories extends React.Component {
  state = {
    trip: {},
    memory: {
      base64: ''
    }
  };

  componentDidMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ memory: { [name]: value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/trips/${this.state.trip.id}/memories`, this.state.memory, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        const trip = Object.assign({}, this.state.trip, { memories: res.data.memories });
        this.setState({ trip, memory: { base64: '' } });
      })
      .catch(err => console.error(err));
  }

  memoryDelete = (e) => {
    const memoryId = e.target.value;
    console.log(e.target.value);

    Axios
      .delete(`/api/trips/${this.state.trip.id}/memories/${memoryId}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        const memories = this.state.trip.memories.filter(memory => memory.id !== memoryId);
        const trip = Object.assign({}, this.state.trip, { memories });
        this.setState({ trip });
      })
      .catch(err => console.error(err));
  }

  render(){
    return(
      <div>

        <MemoriesForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          memory={this.state.memory}
          memories={this.state.trip.memories}
          memoryDelete={this.memoryDelete}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Memories;
