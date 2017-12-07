import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

import Auth from '../../lib/Auth';

class UserShow extends React.Component {
  state = {
    user: {}
  }

  componentWillMount(){

    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      // .then(res => console.log(res.data))
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }


  deleteUser = () => {
    Axios
      .delete(`/api/users/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${Auth.removeToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.error(err));
  }

  render(){
    console.log(this.state.user);
    return(
      <div className="row">
        <div className="col-lg-4">
          <img src={this.state.user.image} className="img-responsive" />
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
        <hr />
        <div className="col-lg-4">
          <h5>UPCOMING TRIPS</h5>
          {this.state.user.upcomingTrips && <div>
            { this.state.user.upcomingTrips.map(trip => {
              return(
                <div key={trip.id} className="">
                  {/* <Link to={`/trips/${trip.id}`}> */}
                  <p>{trip.country}</p>
                  <p>{trip.resort}</p>
                  <p>{moment(trip.date).format('ddd Do YYYY')}</p>
                  {/* </Link> */}
                </div>
              );
            })}
          </div>
          }
        </div>
        <div className="col-lg-4">
          <h5>PAST TRIPS</h5>
          {this.state.user.pastTrips && <div>
            { this.state.user.pastTrips.map(trip => {
              return(
                <div key={trip.id} className="">
                  {/* <Link to={`/trips/${trip.id}`}> */}
                  <p>{trip.country}</p>
                  <p>{trip.resort}</p>
                  <p>{moment(trip.date).format('ddd Do YYYY')}</p>
                  {/* </Link> */}
                </div>
              );
            })}
          </div>
          }
        </div>
        <hr />
        <div className="col-lg-4">
          <h5>DOCUMENTS</h5>
          <p>add file uploader</p>
        </div>
        <hr />
        <div className="col-lg-4">
          <h5>MESSAGES</h5>
          <p>show messages but ideally would like to get an alert of new message and click onto another page to show the private message</p>
        </div>
        <hr />
      </div>
    );
  }
}

export default UserShow;
