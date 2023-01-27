import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
}
from 'mdb-react-ui-kit';
import { projectCreate } from '../actions/projectAction';

const Projects = () => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [projectForm, setProjectForm] = useState({
    title: ''
  });

  const [projects, setProjects] = useState({
    projects: []
  });

  useEffect(() => {
    const fetchProjects = async() => {
      const resp = await fetch('/projects');
      const resp_json = await resp.json();
      setProjects(resp_json.data);
    }
    fetchProjects();
  }, [setProjects]);
  
  const onProjectCreate = async (e) => {
    if (e) e.preventDefault();
    const response = await projectCreate(projectForm);
    if (response.status.code == 200) {
      // response.status.message
      // response.data.title
      setBasicModal(!basicModal);
      setProjects([...projects, response.data]);
    }
  }

  const onUpdateProjectField = (e) => {
    if (e) e.preventDefault();
    const formNew = { ...projectForm, [e.target.name]: e.target.value }
    setProjectForm(formNew);
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {/* <MDBBtn onClick={(e) => onAddProject}>Add new project</MDBBtn> */}
      <MDBBtn onClick={toggleShow}>Add new project</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
          <form onSubmit={(e) => {onProjectCreate(e)}}>

            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBInput wrapperClass='mb-4' label='Project name' name='title' onChange={onUpdateProjectField}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn type='submit'>Submit</MDBBtn>
            </MDBModalFooter>

          </form>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>name</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {projects && projects.length > 0 ? 
          projects.map((prj) => <tr key={`prjKey${prj.id}`}><th scope='row'>{prj.id}</th><th>{prj.title}</th></tr>) : 
          <tr>
            <th scope='row'>no any projects found. please create a new one.</th>
          </tr>
        }
        </MDBTableBody>
      </MDBTable>

    </MDBContainer>
  );
}

export default Projects;