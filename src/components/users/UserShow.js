import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

import Auth from '../../lib/Auth';
import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

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
        headers: { 'Authorization': `Bearer ${Auth.removeToken()}`}
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.error(err));
  }

  render(){
    return(
      <Row>
        <Col>
          <img src={this.state.user.image} className="img-responsive" />
        </Col>
        <Col>
          <h4>{this.state.user.username}</h4>
          <h4>{this.state.user.firstName}</h4>
          <h4>{this.state.user.lastName}</h4>
          <h4>{this.state.user.email}</h4>
        </Col>
        <Col>
          { Auth.isAuthenticated &&
            <Link to={`/users/${this.state.user.id}/edit`}>
              <Button>Edit</Button>
            </Link>
          }
          {' '}
          { Auth.isAuthenticated &&
            <Button onClick={this.deleteUser}>
              Delete
            </Button>
          }
        </Col>

      </Row>
      /* <hr /> */
      // <div className="row">
        // <div className="col-lg-4">
          /* <img src={this.state.user.image} className="img-responsive" /> */
          // <h4>{this.state.user.username}</h4>
          // <h4><em>{this.state.user.firstName}</em></h4>
          // <h4><em>{this.state.user.lastName}</em></h4>
          // <h4><em>{this.state.user.email}</em></h4>
        //   { Auth.isAuthenticated &&
        //     <Link
        //       to={`/users/${this.state.user.id}/edit`}
        //       className="main-button"
        //     >
        //       <button>Edit</button>
        //     </Link>
        //   }
        //   {' '}
        //   { Auth.isAuthenticated &&
        //     <button
        //       className="main-button"
        //       onClick={this.deleteUser}
        //     >
        //       Delete
        //     </button>
        //   }
        // </div>

      //   <div className="col-lg-4">
      //     <h5>UPCOMING TRIPS</h5>
      //     <Link to="/trips/new" className="main-button">
      //       <button>Add Trip</button>
      //     </Link>
      //     {this.state.user.upcomingTrips && <div>
      //       { this.state.user.upcomingTrips.map(trip => {
      //         return(
      //           <div key={trip.id} className="">
      //             <Link to={`/trips/${trip.id}`}>
      //               <p>{trip.country}</p>
      //               <p>{trip.resort}</p>
      //               <p>{moment(trip.date).format('ddd Do YYYY')}</p>
      //             </Link>
      //           </div>
      //         );
      //       })}
      //     </div>
      //     }
      //   </div>
      //   <div className="col-lg-4">
      //     <h5>PAST TRIPS</h5>
      //     {this.state.user.pastTrips && <div>
      //       { this.state.user.pastTrips.map(trip => {
      //         return(
      //           <div key={trip.id} className="">
      //             <Link to={`/trips/${trip.id}`}>
      //               <p>{trip.country}</p>
      //               <p>{trip.resort}</p>
      //               <p>{moment(trip.date).format('ddd Do YYYY')}</p>
      //             </Link>
      //           </div>
      //         );
      //       })}
      //     </div>
      //     }
      //   </div>
      //   <hr />
      //   <div className="col-lg-4">
      //     <h5>DOCUMENTS</h5>
      //     <p>add file uploader</p>
      //   </div>
      //   <hr />
      //   <div className="col-lg-4">
      //     <h5>MESSAGES</h5>
      //     <p>show messages but ideally would like to get an alert of new message and click onto another page to show the private message</p>
      //   </div>
      //   <hr />
      // </div>
    );
  }
}

export default UserShow;
