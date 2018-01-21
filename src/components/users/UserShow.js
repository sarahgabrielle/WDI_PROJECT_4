import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import DocumentForm from './DocumentForm';
import Counter from '../utility/Counter';
import 'font-awesome/css/font-awesome.css';

class UserShow extends React.Component {
      state = {
        user: {},
        doc: {
          base64: '',
          title: ''
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
        const doc = Object.assign({}, this.state.doc, { [name]: value });
        this.setState({ doc });
      }

      handleSubmit = (e) => {
        e.preventDefault();

        Axios
          .post(`/api/users/${this.state.user.id}/documents`, this.state.doc, {
            headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
          })
          .then(res => {
            const user = Object.assign({}, this.state.user, { documents: res.data.documents });
            this.setState({ user, doc: { base64: '', title: '' } });
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
            <div className="mu blf abk">
              <div className="na"></div>
              <div className="mv arx">
                <img src={this.state.user.image} className="blg"/>
                <p className="bjx">{this.state.user.username}</p>
                <p className="abk">{this.state.user.email}</p>
                <ul className="blh">
                  <li className="bli">
                    { Auth.isAuthenticated &&
                      <Link to={`/users/${this.state.user.id}/edit`}>
                        <i className="material-icons">mode_edit</i>
                      </Link>
                    }
                  </li>
                  <li className="bli">
                    { Auth.isAuthenticated &&
                    <Link to="">
                      <i className="material-icons" onClick={this.deleteUser}>delete</i>
                    </Link>
                    }
                  </li>
                </ul>
              </div>
            </div>
            <div className="trips">
              <div className="upcomingTrips">
                <div className="heading">UPCOMING TRIPS</div>
                <div className="tripList">
                  {/* <ul> */}
                  { this.state.user.upcomingTrips && <div>
                    { this.state.user.upcomingTrips.map((trip, i) => {
                      return(
                        <a className="bjx" key={trip.id} href={`/trips/${trip.id}`}>
                          {trip.resort} - {'  '}
                          { ' ' }
                          {moment(trip.date).format('dddd, Do MMM YYYY')}
                          <ul className="blh">
                            <li className="bli">
                              { Auth.isAuthenticated &&
                              <Link to={`/trips/${trip.id}/edit`}>
                                <i className="material-icons">mode_edit</i>
                              </Link>
                              }
                            </li>
                            <li className="bli">
                              { Auth.isAuthenticated &&
                                <Link to={`/users/${this.state.user.id}`}>
                                  <i className="material-icons" onClick={() => this.deleteTrip(trip)}>delete</i>
                                </Link>
                              }
                            </li>
                          </ul>
                          <div className="countdown">
                            Holiday countdown: <Counter date={trip.date} />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  }
                  {/* </ul> */}
                </div>
              </div>
              <div className="pastTrips">
                <div className="heading">PAST TRIPS</div>
                <div className="tripList">
                  {/* <ul> */}
                  {this.state.user.pastTrips && <div>
                    { this.state.user.pastTrips.map(trip => {
                      return(
                        <a className="bjx" key={trip.id} href={`/trips/${trip.id}`}>
                          {trip.resort} -  {'  '}
                          { ' ' }{moment(trip.date).format('dddd, Do MMM YYYY')}
                          <ul className="blh">
                            <li className="bli">
                              { Auth.isAuthenticated &&
                                  <Link to={`/trips/${trip.id}/edit`}>
                                    <i className="material-icons">mode_edit</i>
                                  </Link>
                              }
                            </li>
                            <li className="bli">
                              { Auth.isAuthenticated &&
                                <Link to={`/users/${this.state.user.id}`}>
                                  <i className="material-icons" onClick={() => this.deleteTrip(trip)}>delete</i>
                                </Link>
                              }
                            </li>
                          </ul>
                        </a>
                      );
                    })}
                  </div>
                  }
                  {/* </ul> */}
                </div>
              </div>
              <div className="addTrip">
                <Link className="addButton button" to="/trips/new">
                    ADD TRIP
                </Link>
              </div>
            </div>
            <div className="documents">
              <div className="document">
                DOCUMENTS
              </div>
              <div className="bjx">
                { this.state.user.documents && this.state.user.documents.map(doc =>
                  <div className="bjx" key={doc.id}>
                    <ul className="blh">
                      <li className="bli">
                        <a href={doc.link}>{doc.title}</a>
                      </li>
                      <li className="bli">
                        <button className="docButton" value={doc.id} onClick={this.documentDelete}><strong>x</strong>
                        </button>
                      </li>
                    </ul>
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
