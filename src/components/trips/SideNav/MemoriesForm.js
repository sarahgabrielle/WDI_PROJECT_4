import React from 'react';
import BackButton from '../../utility/BackButton';
import DragDrop from '../../utility/DragDrop';
import { GridList, GridListTile } from 'material-ui/GridList';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

function MemoriesForm({ handleChange, handleSubmit, memory, memories, memoryDelete, history }) {
  return(
    // <div>
    //   <div>
    //     <BackButton history={history} />
    //   </div>
    //   <h1>Trip Memories</h1>
    //   { memories && memories.map(memory =>
    //     <div key={memory.id}>
    //       {memory.fileType === 'image' && <img src={memory.imageSRC} height="150px" width="150px" />}
    //       <button value={memory.id} onClick={memoryDelete}>Delete</button>
    //     </div>
    //   )}
    //   <form onSubmit={handleSubmit} className="col-md-6">
    //     <div className="form-group">
    //       <DragDrop
    //         onChange={handleChange}
    //         value={memory.base64 || memory.imageSRC}
    //         placeholder="Add Image"
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">POST</button>
    //     </div>
    //   </form>
    // </div>


    <div className="root">
      <div>
        <BackButton history={history} />
      </div>
      <GridList cellHeight={160} className="gridList" cols={3}>
        {memories && memories.map((memory, i) =>
          <GridListTile key={memory.id} cols={ (i % 12 === 0) ? 2 : (i % 6 === 0 ? 2 : 1)}>
            {memory.fileType === 'image' && <img src={memory.imageSRC} height="150px" width="150px" />}
            <button value={memory.id} onClick={memoryDelete}>Delete</button>
          </GridListTile>
        )}
      </GridList>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <DragDrop
            onChange={handleChange}
            value={memory.base64 || memory.imageSRC}
            placeholder="Add Image"
          />
        </div>
        <div>
          <Button fab mini color="primary" aria-label="add" className="postImage" type="submit">
            <AddIcon />
          </Button>
          {/* <button type="submit">POST</button> */}
        </div>
      </form>
    </div>
  );
}



export default MemoriesForm;
