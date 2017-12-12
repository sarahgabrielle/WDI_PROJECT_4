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
    this.webSocket.on('connect', () => {
      console.log(`${this.webSocket.id} connected`);

      this.webSocket.on('MESSAGE', data => {
        console.log(data);
      });
    });

    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ message: { [name]: value } });
  }

  handleSubmit = (e, isSocket) => {
    e.preventDefault();
    if(!isSocket) this.webSocket.emit('MESSAGE', { message: this.state.message.content });
    console.log(this.state.trip.id);
    Axios
      .post(`/api/trips/${this.state.trip.id}/messages`, this.state.message, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        const trip = Object.assign({}, this.state.trip, { groupMessage: res.data.groupMessage });
        this.setState({ trip, message: { content: ''} });
      })
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
