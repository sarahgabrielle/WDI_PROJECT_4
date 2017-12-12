import React from 'react';
import Axios from 'axios';
import Auth from '../../../lib/Auth';
import MessageForm from './MessageForm';


class Messages extends React.Component{
  state = {
    trip: {},
    message: {
      content: ''
    }
  };

  componentDidMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => this.setState({ trip: res.data }),
        console.log('Hello', this))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ message: { [name]: value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
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
          messageDelete={this.messageDelete}
          message={this.state.message}
          messages={this.state.trip.groupMessage}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Messages;


  // How to map in a map
  // vm.comments.forEach(comment => {
  //   comment.createdAt = $moment(comment.createdAt).fromNow();
  //   comment.replies.forEach(reply => {
  //     reply.createdAt = $moment(reply.createdAt).fromNow();
  //   });
  // });



//   function deleteComment(comment) {
//     Comment
//       .remove({ id: comment._id })
//       .$promise
//       .then(() => {
//         Comment
//           .query()
//           .$promise
//           .then(data => {
//             vm.comments = data.reverse();
//             vm.comments.forEach(comment => {
//               comment.createdAt = $moment(comment.createdAt).fromNow();
//               comment.replies.forEach(reply => {
//                 reply.createdAt = $moment(reply.createdAt).fromNow();
//               });
//             });
//           });
//       });
//   }
//
//   function addReply(comment) {
//     const reply = document.getElementById(comment._id).value;
//     vm.newReply = {
//       content: reply
//     };
//     Comment
//       .replyCreate({ id: comment._id }, vm.newReply)
//       .$promise
//       .then(() => {
//         Comment
//           .query()
//           .$promise
//           .then(data => {
//             vm.comments = data.reverse();
//             vm.comments.forEach(comment => {
//               comment.createdAt = $moment(comment.createdAt).fromNow();
//               comment.replies.forEach(reply => {
//                 reply.createdAt = $moment(reply.createdAt).fromNow();
//               });
//             });
//             document.getElementById(comment._id).value = '';
//           });
//       });
//   }
//
//   function deleteReply(comment, reply) {
//     Comment
//       .replyDelete({ id: comment._id, replyId: reply._id })
//       .$promise
//       .then(() => {
//         Comment
//           .query()
//           .$promise
//           .then(data => {
//             vm.comments = data.reverse();
//             vm.comments.forEach(comment => {
//               comment.createdAt = $moment(comment.createdAt).fromNow();
//               comment.replies.forEach(reply => {
//                 reply.createdAt = $moment(reply.createdAt).fromNow();
//               });
//             });
//           });
//       });
//   }
//
// }
