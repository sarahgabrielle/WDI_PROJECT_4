import React from 'react';

import BackButton from '../utility/BackButton';
import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

// import AutoSuggest from 'react-bootstrap-autosuggest';
import Select from 'react-select';

function TripForm({ history, handleSubmit, handleChange, trip, handleUser, users, selectedOptions }) {
  const usersForSelect = users.map(user => ({ value: user.id, label: user.username }));
  return(
    <div className="tripForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Country
              </ControlLabel>
              <FormControl
                placeholder="Please enter country"
                type="text"
                id="country"
                name="country"
                value={trip.country}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Resort
              </ControlLabel>
              <FormControl
                placeholder="Please enter resort"
                type="text"
                id="resort"
                name="resort"
                value={trip.resort}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Date
              </ControlLabel>
              <FormControl
                placeholder="Select Date"
                type="date"
                id="date"
                name="date"
                value={trip.date}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Address
              </ControlLabel>
              <FormControl
                placeholder="Please enter the address of your accommodation"
                type="text"
                id="address"
                name="address"
                value={trip.address}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Select
            multi={true}
            name="form-field-name"
            value={selectedOptions}
            onChange={handleUser}
            options={usersForSelect}
          />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <Button type="submit">
                SAVE
              </Button>
              { ' ' }
              <BackButton history={history} />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
}

export default TripForm;
