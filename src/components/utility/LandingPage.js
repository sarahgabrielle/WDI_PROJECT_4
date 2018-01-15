import React from 'react';

class Video extends React.Component {
  state = {
    videoURL: 'src/components/utility/movies/gopro.mp4'
  }


  render() {
    return (
      <video id="background-video" loop autoPlay>
        <source src={this.state.videoURL} type="video/mp4" />
        <source src={this.state.videoURL} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default Video;
