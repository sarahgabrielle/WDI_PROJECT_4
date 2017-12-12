import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import DocumentForm from './DocumentForm';

import { Col, Row, ControlLabel, Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css';

class UserShow extends React.Component {
      state = {
        user: {},
        doc: {
          base64: ''
        }
      }

      getUser() {
        Axios
          .get(`/api/users/${this.props.match.params.id}`)
          .then(res => this.setState({ user: res.data }))
          .catch(err => console.error(err));
      }

      componentWillMount(){
        this.getUser();
      }

      deleteUser = () => {
        Axios
          .delete(`/api/users/${this.props.match.params.id}`, {
            headers: { 'Authorization': `Bearer ${Auth.removeToken()}`}
          })
          .then(() => this.props.history.push('/'))
          .catch(err => console.error(err));
      }

      deleteTrip = (trip) => {
        Axios
          .delete(`/api/trips/${trip.id}`)
          .then(() => this.getUser())
          .catch(err => console.error(err));
      }

      handleChange = ({ target: { name, value } }) => {
        this.setState({ doc: { [name]: value } }, () => console.log(this.state));
      }

      handleSubmit = (e) => {
        e.preventDefault();

        Axios
          .post(`/api/users/${this.state.user.id}/documents`, this.state.doc, {
            headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
          })
          .then(res => {
            const user = Object.assign({}, this.state.user, { documents: res.data.documents });
            this.setState({ user, document: { base64: '' } });
          })
          .catch(err => console.error(err));
      }

      documentDelete = (e) => {
        const documentId = e.target.value;
        console.log(e.target.value);

        Axios
          .delete(`/api/users/${this.state.user.id}/documents/${documentId}`, {
            headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
          })
          .then(() => {
            const documents = this.state.user.documents.filter(doc => doc.id !== documentId);
            const user = Object.assign({}, this.state.user, { documents });
            this.setState({ user });
          })
          .catch(err => console.error(err));
      }

      render(){
        return(
          <div>
            {/* <Row style={{ marginTop: '30px'}}> */}
              {/* <Col> */}
                <img src={this.state.user.image} className="img-responsive" />
              {/* </Col> */}
              {/* <Col> */}
                <h4>{this.state.user.username}</h4>
                <h4>{this.state.user.firstName}</h4>
                <h4>{this.state.user.lastName}</h4>
                <h4>{this.state.user.email}</h4>
              {/* </Col> */}
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
            {/* </Row> */}
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
                            {trip.resort} - {'  '}
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
                        <i className="fa fa-ban fa-lg" aria-hidden="true" onClick={() => this.deleteTrip(trip)}></i>
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
                          <Col md={3} sm={6} xs={12}>
                            {trip.resort} -  {'  '}
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
                          <i className="fa fa-ban fa-lg" aria-hidden="true" onClick={() => this.deleteTrip(trip)}></i>
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
              <h1>Documents</h1>
              { this.state.user.documents && this.state.user.documents.map(doc =>
                <div key={doc.id}>
                  {doc.filename}
                  <button value={doc.id} onClick={this.documentDelete}>Delete</button>
                </div>
              )}
              <DocumentForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                documents={this.state.user.documents}
              />
            </Row>
            {/* <hr /> */}
          </div>
        );
      }
}

export default UserShow;
