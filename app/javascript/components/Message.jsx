import React, { useState } from 'react';
import {
  MDBContainer,
} from 'mdb-react-ui-kit';

const Message = ({error, message}) => {

  return (
    <MDBContainer className="container p-1 my-0 d-flex flex-column w-100">
      <div className="error">{ error }</div>
      <div className="message">{ message }</div>
    </MDBContainer>
  );
}

export default Message;