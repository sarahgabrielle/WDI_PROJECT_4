import React from 'react';
import { Button } from 'react-bootstrap';

const DashBoard = ({ history }) => {
  return (
    <div>
      <div>
        <h5>SNOW REPORT</h5>
      </div>
      <div>
        <h5>WEATHER FORECAST</h5>
      </div>
      <div>
        <h5>FRIENDS/FAMILY</h5>
      </div>
      <Button onClick={() => history.goBack()}>
        Go Back
      </Button>
    </div>
  );
};

export default DashBoard;
