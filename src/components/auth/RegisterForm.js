import React from 'react';
import { FormGroup, FormControl, Form, ControlLabel, Button, Row, Col } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="registerForm">
      <Row>
        <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
          <ControlLabel>
            REGISTER
          </ControlLabel>
        </Col>
      </Row>
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="Image"
                type="text"
                id="image"
                name="image"
                onChange={handleChange}
                value={user.image}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="Username"
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={user.username}
              />
              {errors.username && <small>{errors.username}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="First Name"
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={user.firstName}
              />
              {errors.firstName && <small>{errors.firstName}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={user.lastName}
              />
              {errors.lastName && <small>{errors.lastName}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
              {errors.email && <small>{errors.email}</small>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={user.password}
              />
              { errors.password && <small>{errors.password}</small> }
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <FormControl
                placeholder="Confirm Password"
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                onChange={handleChange}
                value={user.passwordConfirmation}
              />
              { errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small> }
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={10} sm={6} smOffset={3} md={6} mdOffset={3}>
              <Button className="button" type="submit" disabled={formInvalid}>REGISTER</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
};

export default RegisterForm;
