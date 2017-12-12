import React from 'react';
import BackButton from '../../utility/BackButton';
import DragDrop from '../../utility/DragDrop';

function MemoriesForm({ handleChange, handleSubmit, memory, memories, memoryDelete, history }) {
  return(
    <div>
      <div>
        <BackButton history={history} />
      </div>
      <h1>Trip Memories</h1>
      { memories && memories.map(memory =>
        <div key={memory.id}>
          {memory.fileType === 'image' && <img src={memory.imageSRC} height="150px" width="150px" />}
          <button value={memory.id} onClick={memoryDelete}>Delete</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <DragDrop
            onChange={handleChange}
            value={memory.base64 || memory.imageSRC}
            placeholder="Add Image"
          />
        </div>
        <div>
          <button type="submit">POST</button>
        </div>
      </form>
    </div>
  );
}

export default MemoriesForm;
