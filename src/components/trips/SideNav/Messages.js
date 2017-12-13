import React from 'react';
import Axios from 'axios';
import Auth from '../../../lib/Auth';
import MessageForm from './MessageForm';
import socketIOClient from 'socket.io-client';

class Messages extends React.Component {
  webSocket = socketIOClient('/socket');
  state = {
    trip: {},
    message: {
      content: ''
    }
  };

  componentDidMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.error(err));


    this.webSocket.on('connect', () => {
      console.log(`${this.webSocket.id} connected`);

      this.webSocket.on('MESSAGE', data => {
        const trip = Object.assign({}, this.state.trip, { groupMessage: this.state.trip.groupMessage.concat(data)});

        this.setState({ trip });
      });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ message: { [name]: value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post(`/api/trips/${this.state.trip.id}/messages`, this.state.message, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.setState({ message: { content: ''} }))
      .catch(err => console.error(err));
  }

  messageDelete = (e) => {
    const messageId = e.target.value;

    Axios
      .delete(`/api/trips/${this.state.trip.id}/messages/${messageId}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        const groupMessage = this.state.trip.groupMessage.filter(message => message.id !== messageId);
        const trip = Object.assign({}, this.state.trip, { groupMessage });
        this.setState({ trip });
      })
      .catch(err => console.error(err));
  }


  render(){
    console.log(this.state.trip.groupMessage);
    return(
      <div>
        <h1>Trip Messages</h1>
        <MessageForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          message={this.state.message}
          messages={this.state.trip.groupMessage}
          messageDelete={this.messageDelete}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Messages;
