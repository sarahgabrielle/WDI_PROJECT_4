import React from 'react';

function TripForm({ handleSubmit, handleChange, trip }) {
  // const formInvalid = Object.keys(errors).some(key => errors[key]);
  return(
    <div className="row">
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="category">Country</label>
          <select
            className="form-control"
            id="country"
            name="country"
            value={trip.country}
            onChange={handleChange}
          >
            <option value="" disabled>Please Select</option>
            <option>Austria</option>
            <option>Canada</option>
            <option>France</option>
            <option>Italy</option>
            <option>Switzerland</option>
            <option>United States</option>
          </select>
          {/* {errors.category && <small>{errors.category}</small>} */}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            placeholder="Please enter country"
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={trip.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resort">Resort</label>
          <input
            placeholder="Please enter resort"
            type="text"
            className="form-control"
            id="resort"
            name="resort"
            value={trip.resort}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            placeholder="Select Date"
            type="text"
            className="form-control"
            id="date"
            name="date"
            value={trip.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            placeholder="Please enter the address of your accommodation"
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={trip.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="members">Members</label>
          <input
            placeholder="Add friends/family to trip"
            type="text"
            className="form-control"
            id="members"
            name="members"
            value={trip.users}
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

export default TripForm;
