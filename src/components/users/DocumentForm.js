import React from 'react';
import FileUpload from '../utility/FileUpload';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

function DocumentForm({ handleChange, handleSubmit }) {
  return(
    <form onSubmit={handleSubmit}>
      <div className="documentButton">
        <Button fab mini color="primary" aria-label="add" className="post" type="submit">
          <AddIcon />
        </Button>
      </div>
      <div className="fileUpload">
        <FileUpload
          onChange={handleChange}
        />
        <input type="text" name="title" onChange={handleChange} placeholder="Title" />
      </div>
    </form>
  );
}

export default DocumentForm;
