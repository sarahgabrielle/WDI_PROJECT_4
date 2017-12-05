import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="image"
          placeholder="Image"
          onChange={handleChange}
          value={user.image}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={user.username}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          placeholder="firstName"
          onChange={handleChange}
          value={user.firstName}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="lastName"
          placeholder="lastName"
          onChange={handleChange}
          value={user.lastName}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.passwordConfirmation}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
