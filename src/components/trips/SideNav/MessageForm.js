import React from 'react';
import BackButton from '../../utility/BackButton';
import { Form, Button} from 'react-bootstrap';

function MessageForm({ handleChange, handleSubmit, messages, message, history }){
  console.log(message);
  return(
    <div className="ca bkt bku abk">
      { messages && messages.map(message =>
        <div className="oq b acx" key={message.id}>
          <img src={message.createdBy.image} className="bkp ru uk abc"/>
          <div className="or">
            <div className="bky">
              <h6>{message.createdBy.username}</h6>
            </div>
          </div>
          <p>{message.content}</p>
        </div>
      )}
      <div className="oq b acx">
        <Form className="input-group" onSubmit={handleSubmit}>
          <input
            placeholder="Message"
            type="text"
            className="form-control"
            id="content"
            name="content"
            value={message.content}
            onChange={handleChange}
          />
        </Form>
        <div className="jq">
          <Button className="button" type="submit">POST</Button>
        </div>
      </div>
      <div className="backButton">
        <BackButton history={history} />
      </div>
    </div>
  );
}

export default MessageForm;
