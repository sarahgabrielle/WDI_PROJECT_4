import React from 'react';

class Video extends React.Component {
  state = {
    // videoURL: 'src/components/utility/movies/gopro.mp4'
  }


  render() {
    return (
      <div>
        <img className="landingPage" src="/assets/moritz-matlik.jpg" />
        <div className="landingPageText">
          <div className="landingPageTitle">Find Your Adventure</div>
        </div>
      </div>
    );
  }
}

export default Video;
