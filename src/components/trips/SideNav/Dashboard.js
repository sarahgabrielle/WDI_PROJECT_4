import React from 'react';
import Axios from 'axios';
import Auth from '../../../lib/Auth';
// import { Button } from 'react-bootstrap';
import moment from 'moment';
// import Skycons from 'skycons-component';
import '../../utility/skycons';

class DashBoard extends React.Component {
  state = {
    trip: {},
    weather: null
  }

  async componentDidMount(){
    try {
      const { data: trip } = await Axios.get(`/api/trips/${this.props.match.params.id}`);
      const { data: weather } = await Axios
        .get(`/api/trips/${trip.id}/dashboard/getWeatherdata/${trip.resortLocation.lat}/${trip.resortLocation.lng}`);
      this.setState({ trip, weather }, () => {
        var icons = new window.Skycons();
        const list = [
          'clear-day',
          'clear-night',
          'partly-cloudy-day',
          'partly-cloudy-night',
          'cloudy',
          'rain',
          'sleet',
          'snow',
          'wind',
          'fog'
        ];
        for (let i = list.length; i--;) {
          icons.set(list[i], list[i]);
        }
        icons.play();
      });
    } catch (e) {
      console.log(e);
    }
  }

  render(){
    if (!this.state.weather) return null;
    const { offset, timezone, daily } = this.state.weather;
    return(
      <div>
        <h1>This is the DashBoard Page</h1>
        <h1>{timezone}</h1>
        {/* <div className={`weather-icon ${daily.icon}`}></div> */}
        <h1>{daily.icon}</h1>
        <h1>{daily.data.map(data => {
          return(
            <li key={data.time}>
              {moment.unix(data.time).format('MMM Do')}
              <p><canvas id={data.icon} width="128" height="128"></canvas></p>
              <p>{data.summary}</p>
              <p>{moment.unix(data.sunriseTime).add(offset, 'hours').format('LT')}</p>
              <p>{moment.unix(data.sunsetTime).add(offset, 'hours').format('LT')}</p>
              <p>{data.temperatureMin}˚C</p>
              <p>{data.temperatureMax}˚C</p>
              <p>{data.windSpeed}</p>
            </li>
          );
        })}</h1>
      </div>


    );
  }
}

export default DashBoard;

{/* <option value="us">˚F,&nbsp;mph</option>
<option value="us">˚F,&nbsp;mph</option>
<option value="ca">˚C,&nbsp;km/h</option>
<option value="uk2">˚C,&nbsp;mph</option> */}


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
