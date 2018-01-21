import React from 'react';
import Axios from 'axios';
import moment from 'moment';
// import '../../utility/skycons';
// import BackButton from '../../utility/BackButton';

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
    const { currently, hourly, daily } = this.state.weather;
    console.log(this.state.weather);
    return(
      <div>
        <div className="forecasts">
          <div className="bkv">
            <h4 className="title">TODAY</h4>
          </div>
          <div className="snapshot">
            <div className="icon">
              <canvas data-icon={currently.icon} width="50" height="50"></canvas>
            </div>
            <div className="temp">{currently.temperature}˚C</div>
            <div className="summary">{currently.summary}</div>
          </div>
          <div className="hourlySummary">{hourly.summary}</div>
          <div className="extraData">
            <div className="wind">Wind: {currently.windSpeed} Km/h</div>
            <div className="visibility">Visibility: {currently.visibility} km</div>
          </div>
        </div>
        <div className="forecasts">
          <div className="bkv">
            <h4 className="title">WEATHER FORECAST</h4>
          </div>
          <div className="weatherForecast">
            {daily.data.map(data => {
              return(
                <div className="weather" key={data.time}>
                  <div>{data.temperatureMax}˚C</div>
                  <div>
                    <canvas data-icon={data.icon} width="50" height="50"></canvas>
                  </div>
                  <div>
                    {moment.unix(data.time).format('MMM Do')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="forecasts">
          <div className="bkv">
            <h4 className="title">TRIP MEMBERS</h4>
          </div>
          { this.state.trip.users && this.state.trip.users.map(user =>
            <div className="imageBox" key={user.id}>
              <img src={user.image} className="photo"/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DashBoard;
