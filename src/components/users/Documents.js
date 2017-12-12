// import React from 'react';
// import Axios from 'axios';
// import Auth from '../../../lib/Auth';
// import DocumentForm from './DocumentForm';
//
// class Memories extends React.Component {
//   state = {
//     user: {},
//     documents: {
//       base64: ''
//     }
//   };
//
//   componentDidMount(){
//     Axios
//       .get(`/api/users/${this.props.match.params.id}`)
//       .then(res => this.setState({ user: res.data }))
//       .catch(err => console.error(err));
//   }
//
//   handleChange = ({ target: { name, value } }) => {
//     this.setState({ memory: { [name]: value } });
//   }
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//
//     Axios
//       .post(`/api/trips/${this.state.trip.id}/memories`, this.state.memory, {
//         headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
//       })
//       .then(res => {
//         const trip = Object.assign({}, this.state.trip, { memories: res.data.memories });
//         this.setState({ trip, memory: { base64: '' } });
//       })
//       .catch(err => console.error(err));
//   }
//
//   memoryDelete = (e) => {
//     const memoryId = e.target.value;
//     console.log(e.target.value);
//
//     Axios
//       .delete(`/api/trips/${this.state.trip.id}/memories/${memoryId}`, {
//         headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
//       })
//       .then(() => {
//         const memories = this.state.trip.memories.filter(memory => memory.id !== memoryId);
//         const trip = Object.assign({}, this.state.trip, { memories });
//         this.setState({ trip });
//       })
//       .catch(err => console.error(err));
//   }
//
//   render(){
//     return(
//       <div>
//         <DocumentForm
//           handleChange={this.handleChange}
//           handleSubmit={this.handleSubmit}
//           memory={this.state.memory}
//           memories={this.state.trip.memories}
//           memoryDelete={this.memoryDelete}
//           history={this.props.history}
//         />
//       </div>
//     );
//   }
// }
//
// export default Memories;
