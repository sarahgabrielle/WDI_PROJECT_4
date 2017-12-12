import React from 'react';

import BackButton from '../../utility/BackButton';

function MessageForm({ handleChange, handleSubmit, messages, message, history, messageDelete }){
  return(
    <div className="row">
      <div>
        <BackButton history={history} />
      </div>
      <h1>Messages</h1>
      { messages && messages.map(message =>
        <div key={message.id}>
          <p>{message.content}</p>
          <p>{message.createdBy.username}</p>
          <button value={message.id} onClick={messageDelete}>Delete</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="content">MESSAGES</label>
          <input
            type="text"
            className="form-control"
            id="content"
            name="content"
            value={message.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">POST</button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
