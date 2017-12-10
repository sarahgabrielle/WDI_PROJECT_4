import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

import Auth from '../../lib/Auth';
import { Col, Row, ControlLabel, Button } from 'react-bootstrap';
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
            <Row style={{ marginTop: '30px'}}>
              <Col md={3}>
                <img src={this.state.user.image} className="img-responsive" />
              </Col>
              <Col md={3}>
                <h4>{this.state.user.username}</h4>
                <h4>{this.state.user.firstName}</h4>
                <h4>{this.state.user.lastName}</h4>
                <h4>{this.state.user.email}</h4>
              </Col>
              <Col md={3}>
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
            <Link to="/trips/new">
              <Button style={{ margin: '0 0 0 10px'}}>ADD TRIP</Button>
            </Link>
            <Row style={{ margin: '20px 0 0 10px'}}>
              <ControlLabel>
                UPCOMING TRIPS
              </ControlLabel>
            </Row>
            <Row>
              <ul>
                { this.state.user.upcomingTrips && <div>
                  { this.state.user.upcomingTrips.map(trip => {
                    return(
                      <li key={trip.id}>
                        <Link to={`/trips/${trip.id}`}>
                          <Col md={3} sm={6} xs={12}>
                            {trip.resort},  {'  '}
                            {trip.country} { ' ' } -
                            { ' ' }{moment(trip.date).format('dddd, Do MMM YYYY')}
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
                      </li>
                    );
                  })}
                </div>
                }
              </ul>
            </Row>
            <Row style={{ margin: '20px 0 0 10px'}}>
              <ControlLabel>
                PAST TRIPS
              </ControlLabel>
            </Row>
            <Row>
              <ul>
                {this.state.user.pastTrips && <div>
                  { this.state.user.pastTrips.map(trip => {
                    return(
                      <li key={trip.id}>
                        <Link to={`/trips/${trip.id}`}>
                          <Col>
                            {trip.resort}
                            {trip.country}
                            {moment(trip.date).format('ddd Do YYYY')}
                          </Col>
                        </Link>
                        { Auth.isAuthenticated &&
                        <a>
                          <i className="fa fa-ban fa-lg" aria-hidden="true" onClick={this.deleteTrip}></i>
                        </a>
                        }
                      </li>
                    );
                  })}
                </div>
                }
              </ul>
            </Row>
            {/* </Col> */}
            <hr />
            <Row style={{ margin: '20px 0 0 10px'}}>
              <ControlLabel>
                DOCUMENTS
              </ControlLabel>
              <p>add file uploader</p>
            </Row>
            <hr />
            <Row style={{ margin: '20px 0 0 10px'}}>
              <ControlLabel>
                MESSAGES
              </ControlLabel>
              <p>show messages but ideally would like to get an alert of new message and click onto another page to show the private message</p>
            </Row>
            <hr />
          </div>
        );
      }
}

export default UserShow;
