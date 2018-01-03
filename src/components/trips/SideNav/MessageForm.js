import React from 'react';
import BackButton from '../../utility/BackButton';
import { FormGroup, FormControl, Form, ControlLabel, Button, Row, Col } from 'react-bootstrap';

function MessageForm({ handleChange, handleSubmit, messages, message, history, messageDelete }){
  console.log(message);
  return(
    <div className="messageForm ca bkt bku abk">
      <div>
        <BackButton history={history} />
      </div>
      { messages && messages.map(message =>
        <div className="oq b acx" key={message.id}>
          <img src={message.createdBy.image} className="bkp ru uk abc"/>
          <div className="or">
            <div className="bky">
              <h6>{message.createdBy.username}</h6>
            </div>
          </div>
          <p>{message.content}</p>
          {/* <button className="button" value={message.id} onClick={messageDelete}>Delete</button> */}
        </div>
      )}
      <div className="message">
        <form onSubmit={handleSubmit} className="col-md-6">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              value={message.content}
              onChange={handleChange}
            />
          </div>
        </form>
        <div>
          <button className="button" type="submit">POST</button>
        </div>
      </div>
    </div>
  );
}

export default MessageForm;
