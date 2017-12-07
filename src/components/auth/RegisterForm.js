import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="image">IMAGE</label>
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
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
          className="form-control"
        />
        {errors.username && <small>{errors.username}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="firstName">FIRST NAME</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={user.firstName}
          className="form-control"
        />
        {errors.firstName && <small>{errors.firstName}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">LAST NAME</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={user.lastName}
          className="form-control"
        />
        {errors.lastName && <small>{errors.lastName}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="email">EMAIL</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          className="form-control"
        />
        {errors.email && <small>{errors.email}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="Password">PASSWORD</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          className="form-control"
        />
        {errors.password && <small>{errors.password}</small>}
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">CONFIRM PASSWORD</label>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.passwordConfirmation}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary" disabled={formInvalid}>Register</button>
    </form>
  );
};

export default RegisterForm;
