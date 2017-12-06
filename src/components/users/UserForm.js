import React from 'react';

function UserForm({ handleSubmit, handleChange, user }) {
  return (
    <div className="row">
      {/* <div className="page-banner col-md-12">
      </div> */}
      <h1>OI</h1>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            placeholder="put image link here"
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={user.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Username</label>
          <input
            placeholder="Username"
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">First Name</label>
          <input
            placeholder="Joe"
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Last Name</label>
          <input
            placeholder="Bloggs"
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Email</label>
          <input
            placeholder="joe.bloggs@gmail.com"
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="save-button">Save</button>
          <button className="danger-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
