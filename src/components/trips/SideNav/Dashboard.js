import React from 'react';
import Axios from 'axios';
import Auth from '../../../lib/Auth';
// import { Button } from 'react-bootstrap';
import moment from 'moment';

class DashBoard extends React.Component {
  state = {
    trip: {},
    weather: null
  }
  componentDidMount(){
    Axios
      .get(`/api/trips/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ trip: res.data });

        Axios
          .get(`/api/trips/${res.data.id}/dashboard/getWeatherdata/${res.data.resortLocation.lat}/${res.data.resortLocation.lng}`)
          .then(res => this.setState({ weather: res.data }));
      })
      .catch(err => console.error(err));
  }

  render(){
    console.log(this.state.weather);
    return(
      <div>
        <h1>This is the DashBoard Page</h1>

        { this.state.weather && <h1>{this.state.weather.timezone}</h1> }
        {/* { this.state.weather && <h1>{moment.unix(this.state.weather.currently.time).format('MMM Do')}</h1> } */}
        { this.state.weather && <h1>{this.state.weather.daily.icon}</h1>}
        { this.state.weather && <h1>{this.state.weather.daily.data.map(data => {
          return(
            <li key={data.id}>
              {moment.unix(data.time).format('MMM Do')}
              <p>{data.icon}</p>
              <p>{data.summary}</p>
              <p>{moment.unix(data.sunriseTime).format('LT')}</p>
              <p>{moment.unix(data.sunsetTime).format('LT')}</p>
              <p>{data.temperatureMin}*C</p>
              <p>{data.temperatureMax}*C</p>
            </li>
          );
        })}</h1>}
      </div>


    );
  }
}

export default DashBoard;

{/* <div>
  <figure className="icons">
    <canvas id="clear-day" width="64" height="64"></canvas>
    <canvas id="clear-night" width="64" height="64"></canvas>
    <canvas id="partly-cloudy-day" width="64" height="64"></canvas>
    <canvas id="partly-cloudy-night" width="64" height="64"></canvas>
    <canvas id="cloudy" width="64" height="64"></canvas>
    <canvas id="rain" width="64" height="64"></canvas>
    <canvas id="sleet" width="64" height="64"></canvas>
    <canvas id="snow" width="64" height="64"></canvas>
    <canvas id="wind" width="64" height="64"></canvas>
    <canvas id="fog" width="64" height="64"></canvas>
  </figure>

  <script src="https://rawgithub.com/darkskyapp/skycons/master/skycons.js"></script>
</div>; */}
