import React, { useState } from 'react';
import {
  MDBContainer,
}
from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";


const Projects = () => {
  const [projects, setProjects] = useState({
    projects: []
  });

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <Link to='/'>Login</Link>
      Projects
    </MDBContainer>
  );
}

export default Projects;