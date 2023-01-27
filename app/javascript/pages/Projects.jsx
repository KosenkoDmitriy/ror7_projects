import React, { useState } from 'react';
import {
  MDBContainer,
}
from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { userLogout } from '../actions/userAction';


const Projects = () => {
  const [projects, setProjects] = useState({
    projects: []
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onLogout = async (e) => {
    if (e) e.preventDefault();
    // notificationHide();
    const response = await userLogout();
    console.log('logout', response);
    // notificationShow(response)
    if (response.status.ok)
      setIsLoggedIn(false)
    else
      setIsLoggedIn(true)
  };

  // if (!isLoggedIn) return <Navigate to='/login' replace={true} />

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <Link to='/'>Login</Link>
      <a onClick={(e) => onLogout(e) }>Logout</a>
      Projects
    </MDBContainer>
  );
}

export default Projects;