import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Projects() {
  const [projects, setProjects] = useState({
    projects: []
  });

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      Projects
    </MDBContainer>
  );
}

export default Projects;