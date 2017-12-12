import React from 'react';
import FileUpload from '../utility/FileUpload';

function DocumentForm({ handleChange, handleSubmit }) {
  return(
    <form onSubmit={handleSubmit} className="col-md-6">
      <div className="form-group">
        <FileUpload
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">POST</button>
      </div>
    </form>
  );
}

export default DocumentForm;
