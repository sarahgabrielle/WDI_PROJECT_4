import React from 'react';
import Axios from 'axios';
import moment from 'moment';
import '../../utility/skycons';
import BackButton from '../../utility/BackButton';

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
    const { offset, daily } = this.state.weather;
    console.log(this.state.trip);
    return(
      <div>
        <div className="forecasts">
          <div className="bkv">
            <h4 className="title">WEATHER FORECAST</h4>
          </div>
          <div className="weatherForecast">
            {daily.data.map(data => {
              return(
                <div className="weather" key={data.time}>
                  <div>
                    <canvas data-icon={data.icon} width="50" height="50"></canvas>
                  </div>
                  <div>
                    {moment.unix(data.time).format('MMM Do')}
                  </div>
                  {/* <p>{data.summary}</p> */}
                  {/* <p>{moment.unix(data.sunriseTime).add(offset, 'hours').format('LT')}</p> */}
                  {/* <p>{moment.unix(data.sunsetTime).add(offset, 'hours').format('LT')}</p> */}
                  {/* <p>{data.temperatureMin}˚C</p> */}
                  {/* <p>{data.temperatureMax}˚C</p> */}
                  {/* <p>{data.windSpeed}</p> */}
                </div>
              );
            })}
          </div>
        </div>
        <div className="forecasts">
        </div>
        <div className="backButton dashboardPage">
          <BackButton history={history} />
        </div>
      </div>
    );
  }
}

export default DashBoard;
