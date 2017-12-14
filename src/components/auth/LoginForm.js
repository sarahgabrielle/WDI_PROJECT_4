import React from 'react';
import {TextField} from 'material-ui';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="login">LOGIN</InputLabel>
        <div className="form-group">
          <TextField
            label="Username or Email"
            type="text"
            id="identifier"
            name="identifier"
            onChange={handleChange}
            value={user.identifier}
            className="form-control"
            margin="normal"
          />
          <div>
            { errors.identifier && <small>{errors.identifier}</small> }
          </div>
        </div>
        <div className="form-group">
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            className="form-control"
            margin="normal"
          />
          <div>
            { errors.password && <small>{errors.password}</small> }
          </div>
        </div>
        <Button type="submit" raised color="accent" disabled={formInvalid}>LOG IN</Button>
      </form>
    </div>


    // <div className="loginForm">
    //   <Form onSubmit={handleSubmit}>
    //     <FormControl fullWidth className="formControl">
    //       <InputLabel htmlFor="identifier">Username or Email</InputLabel>
    //       <Input
    //         id="identifier"
    //         name="identifier"
    //         placeholder="Username or Email"
    //         onChange={handleChange}
    //         value={user.identifier}
    //       />
    //     </FormControl>
    //     <FormControl className="formControl">
    //       <InputLabel htmlFor="password">Password</InputLabel>
    //       <Input
    //         // type="password"
    //         name="password"
    //         onChange={handleChange}
    //         value={user.password}
    //         id="password"
    //       />
    //     </FormControl>
    //     <FormControl>
    //       <Button disabled={formInvalid}>
    //         LOG IN
    //       </Button>
    //     </FormControl>
    //   </Form>
    // </div>

    // <div className="loginForm">
    //   <Row>
    //     <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
    //       <ControlLabel>
    //         LOGIN
    //       </ControlLabel>
    //     </Col>
    //   </Row>
    //   <br />
    //   <Form onSubmit={handleSubmit}>
    //     <FormGroup controlId="formBasicText">
    //       <Row>
    //         <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
    //           <ControlLabel>
    //             Username or Email
    //           </ControlLabel>
    //           <FormControl
    //             type="text"
    //             name="identifier"
    //             placeholder="Username or Email"
    //             onChange={handleChange}
    //             value={user.identifier}
    //           />
    //           { errors.identifier && <small>{errors.identifier}</small> }
    //         </Col>
    //       </Row>
    //     </FormGroup>
    //     <FormGroup controlId="formBasicPassword">
    //       <Row>
    //         <Col xs={10} xsOffset={1} sm={6} smOffset={3} md={6} mdOffset={3}>
    //           <ControlLabel>
    //             Password
    //           </ControlLabel>
    //           <FormControl
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             onChange={handleChange}
    //             value={user.password}
    //           />
    //           { errors.password && <small>{errors.password}</small> }
    //         </Col>
    //       </Row>
    //     </FormGroup>
    //     <FormGroup>
    //           <Button type="submit" disabled={formInvalid}>
    //               LOG IN
    //           </Button>
    //     </FormGroup>
    //   </Form>
    // </div>
  );
};

export default LoginForm;
