import React from 'react';
import BackButton from '../../utility/BackButton';
import DragDrop from '../../utility/DragDrop';
import { Form, Button, Row, Col, FormGroup} from 'react-bootstrap';

function MemoriesForm({ handleChange, handleSubmit, memory, memories, memoryDelete, history }) {
  console.log(memories);
  return(
    <div>
      <div className="memories">
        <div className="bkv">
          {memories && memories.map((memory) =>
            <div className="memory" key={memory.id}>
              {memory.fileType === 'image' && <img className="image" src={memory.imageSRC} height="200px" width="200px" />}
              <button className="imageDelete" value={memory.id} onClick={memoryDelete}>X</button>
            </div>
          )}
        </div>
      </div>
      <div className="addImageForm">
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <DragDrop
              onChange={handleChange}
              value={memory.base64 || memory.imageSRC}
            />
          </div>
          <div className="addImage">
              <Button className="button" type="submit">ADD IMAGE
              </Button>
              </div>
              <div className="backButton">
                <BackButton history={history} />
              </div>
        </Form>
      </div>
    </div>
  );
}

export default MemoriesForm;
