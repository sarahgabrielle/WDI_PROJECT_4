import React from 'react';
import { Button } from 'react-bootstrap';

const BackButton = ({ history }) => {
  return (
    <Button className="button" onClick={() => history.goBack()}>
      CANCEL
    </Button>
  );
};

export default BackButton;
