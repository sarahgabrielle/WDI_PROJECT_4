// import React from 'react';
// import Axios from 'axios';
// import Auth from '../../../lib/Auth';
// import MessageForm from './MessageForm';
//
//
// class Messages extends React.Component{
//   state = {
//     message: {
//       content: '',
//       replies: []
//     }
//   };
//
//   componentDidMount(){
//     Axios
//       .get('/api/messages')
//       .then(res => this.setState({ message: res.data }))
//       .catch(err => console.error(err));
//   }
//
//   handleChange = ({ target: {name, value } }) => {
//     const message = Object.assign({}, this.state.message, {[name]: value });
//     this.setState({ message });
//   }
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//
//     Axios
//       .post('/api/messages/', this.state.message, {
//         headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
//       })
//       .then((res) => this.props.history.push(`/messages/${res.data.id}`))
//       .catch(err => console.error(err));
//   }
//
//
//   render(){
//     return(
//       <MessageForm
//         handleChange={this.handleChange}
//         handleSubmit={this.handleSubmit}
//       />
//     );
//   }
// }
//
// export default Messages;
