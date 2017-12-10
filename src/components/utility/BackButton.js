import React from 'react';
import { Button } from 'react-bootstrap';

const BackButton = ({ history }) => {
  return (
    <Button onClick={() => history.goBack()}>
        CANCEL
    </Button>
  );
};

export default BackButton;
