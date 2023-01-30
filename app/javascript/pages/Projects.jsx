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
import { projectCreate, projectDelete, projectUpdate } from '../actions/projectAction';

const Projects = () => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => setEditModal(!editModal);

  const [projectForm, setProjectForm] = useState({
    title: ''
  });

  const [projectToEdit, setProjectToEdit] = useState({title:''});

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
  
  const onProjectCreateBtnClick = async (e) => {
    if (e) e.preventDefault();
    const response = await projectCreate(projectForm);
    if (response.status.code == 200) {
      // response.status.message
      // response.data.title
      setBasicModal(!basicModal);
      setProjects([...projects, response.data]);
    }
  }

  const onChangeInputOfProjectCreateForm = (e) => {
    if (e) e.preventDefault();
    const formNew = { ...projectForm, [e.target.name]: e.target.value }
    setProjectForm(formNew);
  }

  const onChangeInputOfProjectUpdateForm = (e) => {
    if (e) e.preventDefault();
    const formNew = { ...projectToEdit, [e.target.name]: e.target.value }
    setProjectToEdit(formNew);
  }

  const onProjectDeleteBtnClick = async (e, id) => {
    if (e) e.preventDefault();
    const response = await projectDelete(id);
    if (response.status.code == 200) {
      // response.status.message
      // response.data.title
      setProjects(projects.filter((item) => item.id != id));
    }
  }

  const onProjectUpdateBtnClick = async (e, project) => {
    if (e) e.preventDefault();
    setProjectToEdit(project);
    toggleEdit();
  }

  const onProjectUpdateForm = async (e) => {
    if (e) e.preventDefault();
    const response = await projectUpdate(projectToEdit);
    if (response.status.code == 200) {
      // response.status.message
      // response.data.title
      setProjects(projects.map((item) => item.id == response.data.id ? response.data : item));
    }
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBBtn onClick={toggleShow}>Add new project</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
          <form onSubmit={(e) => {onProjectCreateBtnClick(e)}}>

            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBInput wrapperClass='mb-4' label='Project name' name='title' onChange={onChangeInputOfProjectCreateForm}/>
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
      <MDBModal show={editModal} setShow={setEditModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
          <form onSubmit={(e) => {onProjectUpdateForm(e)}}>

            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleEdit}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBInput wrapperClass='mb-4' label='Project name' 
              name='title' 
              value={projectToEdit.title} 
              onChange={onChangeInputOfProjectUpdateForm}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleEdit}>
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
            <th scope='col'>update</th>
            <th scope='col'>delete</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {projects && projects.length > 0 ? 
          projects.map((prj) => 
          <tr key={`prjKey${prj.id}`}>
            <th scope='row'>{prj.id}</th>
            <th>{prj.title}</th>
            <th><MDBBtn onClick={(e) => onProjectUpdateBtnClick(e, prj)}>-</MDBBtn></th>
            <th><MDBBtn onClick={(e) => onProjectDeleteBtnClick(e, prj.id)}>x</MDBBtn></th>
          </tr>) : 
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