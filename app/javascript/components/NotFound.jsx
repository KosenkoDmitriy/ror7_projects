import React, { useState } from 'react';
import {
  MDBContainer,
}
from 'mdb-react-ui-kit';

export const NotFound = () => {
  const [projects, setProjects] = useState({
    projects: []
  });

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      Not Found
    </MDBContainer>
  );
}
