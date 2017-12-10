import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

import Auth from '../../lib/Auth';
import { Col, Row, ControlLabel } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css';

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

      deleteTrip = () => {
        
      }

      render(){
        return(
          <div>
            <Row className="userShow">
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
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                  </Link>
                }
                {' '}
                { Auth.isAuthenticated &&
                <a>
                  <i className="fa fa-ban fa-lg" aria-hidden="true" onClick={this.deleteUser}></i>
                </a>
                }
              </Col>
            </Row>
            <hr />
            <Col>
              <ControlLabel>
                UPCOMING TRIPS
              </ControlLabel>
              { this.state.user.upcomingTrips && <div>
                { this.state.user.upcomingTrips.map(trip => {
                  return(
                    <Row key={trip.id}>
                      <Link to={`/trips/${trip.id}`}>
                        <Col md={4} sm={6} xs={12}>
                          <p>{trip.resort}</p>
                          <p>{trip.country}</p>
                          <p>{moment(trip.date).format('ddd Do YYYY')}</p>
                        </Col>
                      </Link>
                      { Auth.isAuthenticated &&
                        <Link to={`/trips/${trip.id}/edit`}>
                          <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                        </Link>
                      }
                      {' '}
                      { Auth.isAuthenticated &&
                        <a>
                          <i className="fa fa-ban fa-lg" aria-hidden="true" onClick={this.deleteTrip}></i>
                        </a>
                      }
                    </Row>
                  );
                })}
              </div>
              }
              <Col>
                <Link to="/trips/new">
                  <i className="fa fa-plus fa-lg" aria-hidden="true"></i>
                </Link>
              </Col>
            </Col>
            <Col>
              <h5>PAST TRIPS</h5>
              {this.state.user.pastTrips && <div>
                { this.state.user.pastTrips.map(trip => {
                  return(
                    <div key={trip.id}>
                      <Link to={`/trips/${trip.id}`}>
                        <p>{trip.country}</p>
                        <p>{trip.resort}</p>
                        <p>{moment(trip.date).format('ddd Do YYYY')}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
              }
            </Col>
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
