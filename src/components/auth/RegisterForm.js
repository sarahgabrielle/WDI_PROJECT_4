import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="registerForm">
      <Row>
        <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
          <ControlLabel>
            REGISTER
          </ControlLabel>
        </Col>
      </Row>
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
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
              {errors.username && <small>{errors.username}</small>}
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
              {errors.firstName && <small>{errors.firstName}</small>}
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
              {errors.lastName && <small>{errors.lastName}</small>}
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
              {errors.email && <small>{errors.email}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicPassword">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                PASSWORD
              </ControlLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              { errors.password && <small>{errors.password}</small> }
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="formBasicPassword">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                CONFIRM PASSWORD
              </ControlLabel>
              <FormControl
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={user.passwordConfirmation}
              />
              { errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small> }
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <Button type="submit" disabled={formInvalid}>
                  REGISTER
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
};

export default RegisterForm;
