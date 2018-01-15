import React from 'react';
import FileUpload from '../utility/FileUpload';
import { Form, Button} from 'react-bootstrap';

function DocumentForm({ handleChange, handleSubmit }) {
  console.log('clicking');
  return(
    <Form onSubmit={handleSubmit}>
      <div className="fileUpload">
        <FileUpload
          onChange={handleChange}
        />
        <input className="fileTitle" type="text" name="title" onChange={handleChange} placeholder="Enter Doc Title"/>
      </div>
      <div className="addDocument">
        <Button className="button" type="submit">ADD DOCUMENT</Button>
      </div>
    </Form>
  );
}

export default DocumentForm;
