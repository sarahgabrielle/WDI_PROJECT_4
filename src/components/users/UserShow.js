import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import DocumentForm from './DocumentForm';
import Counter from '../utility/Counter';

import { Col, Row, ControlLabel } from 'react-bootstrap';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import 'font-awesome/css/font-awesome.css';

class UserShow extends React.Component {
      state = {
        user: {},
        doc: {
          base64: ''
        }
      }

      getUser() {
        return Axios
          .get(`/api/users/${this.props.match.params.id}`)
          .then(res => this.setState({ user: res.data }))
          .catch(err => console.error(err));
      }

      componentWillMount(){
        this.intervals = [];
        this.counters = [];
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
            <div className="userImage">
              <div>
                { Auth.isAuthenticated &&
                  <Link to={`/users/${this.state.user.id}/edit`}>
                    <i className="material-icons">mode_edit</i>
                  </Link>
                }
                { Auth.isAuthenticated &&
                <a>
                  <i className="material-icons" onClick={this.deleteUser}>delete</i>
                </a>
                }
              </div>
              <img src={this.state.user.image} className="img-responsive" style={{
                marginTop: '20px'}}/>
            </div>
            <div>
              <List className="userProfile">
                <ListItem className="listItemProfile">
                  <ListItemText primary={this.state.user.username} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={this.state.user.email} />
                </ListItem>
              </List>
            </div>
            <hr />
            <div className="upcomingTrips">
              <div>
                <Link to="/trips/new">
                  <Button fab mini color="primary" aria-label="add" className="addTrip">
                    <AddIcon />
                  </Button>
                </Link>
              </div>
                UPCOMING TRIPS
            </div>
            <div>
              <List>
                { this.state.user.upcomingTrips && <div>
                  { this.state.user.upcomingTrips.map((trip, i) => {
                    return(
                      <ListItem button component="a" className="listItem" key={trip.id} href={`/trips/${trip.id}`}>
                        {trip.resort} - {'  '}
                        { ' ' }
                        {moment(trip.date).format('dddd, Do MMM YYYY')}
                        <div className="tripButtons">
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
                        </div>
                        <div className="countdown">
                    Holiday countdown: <Counter date={trip.date} />
                        </div>
                      </ListItem>
                    );
                  })}
                </div>
                }
                {/* <ul>
                { this.state.user.upcomingTrips && <div>
                  { this.state.user.upcomingTrips.map((trip, i) => {
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
                        Holiday countdown: <Counter date={trip.date} />
                      </li>
                    );
                  })}
                </div>
                }
              </ul> */}
              </List>
            </div>
            <div className="pastTrips">
              <div>

              </div>
                PAST TRIPS
            </div>
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
            <hr />
            <div className="documents">
              DOCUMENTS
              <div>
                { this.state.user.documents && this.state.user.documents.map(doc =>
                  <div key={doc.id}>
                    {doc.filename}
                    <button value={doc.id} onClick={this.documentDelete}>Delete</button>
                  </div>
                )}
              </div>
              <DocumentForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                documents={this.state.user.documents}
              />
            </div>
          </div>
        );
      }
}

export default UserShow;
