import React from 'react';

import BackButton from '../utility/BackButton';
import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

import AutoComplete from '../utility/AutoComplete';
import Select from 'react-select';

function TripForm({ history, handleSubmit, handleChange, trip, handleUser, users, selectedOptions, handleResortLocationChange, handleAccomodationLocationChange }) {
  const usersForSelect = users.map(user => ({ value: user.id, label: user.username }));
  return(
    <div className="tripForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Resort
              </ControlLabel>
              <AutoComplete handleLocationChange={handleResortLocationChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
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
        <FormGroup>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Address
              </ControlLabel>
              <AutoComplete handleLocationChange={handleAccomodationLocationChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                Add Friends/Family
              </ControlLabel>
              <Select
                multi={true}
                name="form-field-name"
                value={selectedOptions}
                onChange={handleUser}
                options={usersForSelect}
              />
            </Col>
          </Row>
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
