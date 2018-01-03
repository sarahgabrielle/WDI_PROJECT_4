/* global google */
import React from 'react';

class AutoComplete extends React.Component {

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.input);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      const address = place.formatted_address;
      const location = place.geometry.location.toJSON();
      this.props.handleLocationChange(address, location);
    });
  }

  render() {
    return(
      <input className="form-control" ref={element => this.input = element} />
    );
  }
}

export default AutoComplete;
