import React from 'react';
import BackButton from '../utility/BackButton';
import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

function UserForm({ history, handleSubmit, handleChange, user }) {
  return (
    <div className="userForm">
      <Row>
        <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
          <ControlLabel>
            EDIT PROFILE
          </ControlLabel>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel className="avatar">
                IMAGE
              </ControlLabel>
              <FormControl
                className="avatar"
                type="text"
                name="image"
                placeholder="Image"
                onChange={handleChange}
                value={user.image}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                USERNAME
              </ControlLabel>
              <FormControl
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={user.username}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                FIRST NAME
              </ControlLabel>
              <FormControl
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={user.firstName}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                LAST NAME
              </ControlLabel>
              <FormControl
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={user.lastName}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                EMAIL
              </ControlLabel>
              <FormControl
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
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

export default UserForm;
