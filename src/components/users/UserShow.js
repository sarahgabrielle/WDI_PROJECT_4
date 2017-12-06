import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class UserShow extends React.Component {
  state = {
    user: {}
  }

  componentWillMount(){
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  deleteUser = () => {
    Axios
      .delete(`/api/users/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.error(err));
  }

  render(){
    return(
      <div className="row">
        <div className="image-tile col-md-6">
          <img src={this.state.user.image} className="img-responsive" />
        </div>
        <div className="col-md-6">
          <h4>{this.state.user.username}</h4>
          <h4><em>{this.state.user.firstName}</em></h4>
          <h4><em>{this.state.user.lastName}</em></h4>
          <h4><em>{this.state.user.email}</em></h4>
          { Auth.isAuthenticated &&
            <Link
              to={`/users/${this.state.user.id}/edit`}
              className="main-button"
            >
              Edit
            </Link>
          }
          {' '}
          { Auth.isAuthenticated &&
            <button
              className="main-button"
              onClick={this.deleteUser}
            >
              Delete
            </button>
          }
        </div>
      </div>
    );
  }
}

export default UserShow;
