import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="identifier"
          placeholder="Username or Email address"
          onChange={handleChange}
          value={user.identifier}
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
      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default LoginForm;
