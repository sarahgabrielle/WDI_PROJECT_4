import React from 'react';
import { Button } from 'react-bootstrap';

const BackButton = ({ history }) => {
  return (
    <Button onClick={() => history.goBack()}>
      <i className="material-icons">arrow_back</i>
    </Button>
  );
};

export default BackButton;
