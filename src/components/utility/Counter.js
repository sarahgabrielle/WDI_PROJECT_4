import React from 'react';
import moment from 'moment';

class Counter extends React.Component {

  countdown(date){
    const eventTime = moment(date);
    const now = moment();

    function padNum(num) {
      return num < 10 ? '0' + num : num;
    }

    function getTime(now) {
      const duration = eventTime.diff(now, 'seconds');
      const days = Math.floor(duration / 60 / 60 / 24);
      const hours = Math.floor((duration - (days * 24 * 60 * 60)) / 60 / 60);
      const minutes = Math.floor((duration - (days * 24 * 60 * 60) - (hours * 60 * 60)) / 60);

      return `${days}d ${padNum(hours)}h ${padNum(minutes)}m`;
    }

    this.counter.innerHTML = getTime(now);

    this.interval = setInterval(() => {
      const now = moment();
      this.counter.innerHTML = getTime(now);
    }, 1000);
  }

  componentDidMount() {
    this.countdown(this.props.date);
  }

  render() {
    return (
      <span ref={element => this.counter = element}></span>
    );
  }
}

export default Counter;
