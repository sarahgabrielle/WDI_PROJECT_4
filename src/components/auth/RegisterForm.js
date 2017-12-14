import React from 'react';
import {TextField} from 'material-ui';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="register">REGISTER</InputLabel>
        <div className="form-group">
          <TextField
            label="Image"
            type="text"
            id="image"
            name="image"
            onChange={handleChange}
            value={user.image}
            className="form-control"
            margin="normal"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Username"
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={user.username}
            className="form-control"
            margin="normal"
          />
          <div>
            {errors.username && <small>{errors.username}</small>}
          </div>
        </div>
        <div className="form-group">
          <TextField
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={user.firstName}
            className="form-control"
            margin="normal"
          />
          <div>
            {errors.firstName && <small>{errors.firstName}</small>}
          </div>
        </div>
        <div className="form-group">
          <TextField
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={user.lastName}
            className="form-control"
            margin="normal"
          />
          <div>
            {errors.lastName && <small>{errors.lastName}</small>}
          </div>
        </div>
        <div className="form-group">
          <TextField
            label="Email"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            className="form-control"
            margin="normal"
          />
          <div>
            {errors.email && <small>{errors.email}</small>}
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
        <div className="form-group">
          <TextField
            label="Confirm Password"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={handleChange}
            value={user.passwordConfirmation}
            className="form-control"
            margin="normal"
          />
          <div>
            { errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small> }
          </div>
        </div>
        <Button type="submit" raised color="accent" disabled={formInvalid}>REGISTER</Button>
      </form>
    </div>
  );
};

export default RegisterForm;

//
// <div className="registerForm">
//   <form onSubmit={handleSubmit}>
//     <InputLabel htmlFor="amount">REGISTER</InputLabel>
//     <div className="form-group">
//       <TextField
//         label="Image"
//         type="text"
//         id="image"
//         name="image"
//         onChange={handleChange}
//         value={user.image}
//         className="form-control"
//         margin="normal"
//       />
//     </div>
//     <div className="form-group">
//       <TextField
//         label="Username"
//         type="text"
//         id="username"
//         name="username"
//         onChange={handleChange}
//         value={user.username}
//         className="form-control"
//         margin="normal"
//       />
//       <div>
//         {errors.username && <small>{errors.username}</small>}
//       </div>
//     </div>
//     <div className="form-group">
//       <TextField
//         label="First Name"
//         type="text"
//         id="firstName"
//         name="firstName"
//         onChange={handleChange}
//         value={user.firstName}
//         className="form-control"
//         margin="normal"
//       />
//       <div>
//         {errors.firstName && <small>{errors.firstName}</small>}
//       </div>
//     </div>
//     <div className="form-group">
//       <TextField
//         label="Last Name"
//         type="text"
//         id="lastName"
//         name="lastName"
//         onChange={handleChange}
//         value={user.lastName}
//         className="form-control"
//         margin="normal"
//       />
//       <div>
//         {errors.lastName && <small>{errors.lastName}</small>}
//       </div>
//     </div>
//     <div className="form-group">
//       <TextField
//         label="Email"
//         type="email"
//         id="email"
//         name="email"
//         onChange={handleChange}
//         value={user.email}
//         className="form-control"
//         margin="normal"
//       />
//       <div>
//         {errors.email && <small>{errors.email}</small>}
//       </div>
//     </div>
//     <div className="form-group">
//       <TextField
//         label="Password"
//         type="password"
//         id="password"
//         name="password"
//         onChange={handleChange}
//         value={user.password}
//         className="form-control"
//         margin="normal"
//       />
//       <div>
//         { errors.password && <small>{errors.password}</small> }
//       </div>
//     </div>
//     <div className="form-group">
//       <TextField
//         label="Confirm Password"
//         type="password"
//         id="passwordConfirmation"
//         name="passwordConfirmation"
//         onChange={handleChange}
//         value={user.passwordConfirmation}
//         className="form-control"
//         margin="normal"
//       />
//       <div>
//         { errors.passwordConfirmation && <small>{errors.passwordConfirmation}</small> }
//       </div>
//     </div>
//     <Button type="submit" raised color="accent" disabled={formInvalid}>REGISTER</Button>
//   </form>
// </div>
