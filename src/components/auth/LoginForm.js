import React from 'react';

import { FormGroup, FormControl, Form, Col, Row, ControlLabel, Button } from 'react-bootstrap';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="loginForm">
      <Row>
        <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
          <ControlLabel>
            LOGIN
          </ControlLabel>
        </Col>
      </Row>
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicText">
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <ControlLabel>
                USERNAME OR EMAIL
              </ControlLabel>
              <FormControl
                type="text"
                name="identifier"
                placeholder="Username or Email"
                onChange={handleChange}
                value={user.identifier}
              />
              { errors.identifier && <small>{errors.identifier}</small> }
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
        <FormGroup>
          <Row>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
              <Button type="submit" disabled={formInvalid}>
                  LOG IN
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
};

export default LoginForm;
