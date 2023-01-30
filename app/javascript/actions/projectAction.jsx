

const projectDelete = async (projectId) => {
  const json_data = JSON.stringify({project: { id: projectId }});

  const requestOptions = {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    },
    body: json_data
  };

  const res = await fetch(`/projects/${projectId}`, requestOptions).then(response => response.json())
  return res;
}

const projectCreate = async (form_data) => {
  console.log('projectCreate', form_data);
  const json_data = JSON.stringify({project: form_data});
  const requestOptions = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    },
    body: json_data
  };

  const res = await fetch("/projects", requestOptions).then(response => response.json())
  return res;
}

const projectView = async (projectId) => {
  
}

const projectUpdate = async (form_data) => {
  console.log('projectUpdate', form_data);
  const json_data = JSON.stringify({project: form_data});
  // const json_data = JSON.stringify({project: { id: project.id, title: project.title }});

  const requestOptions = {
    method: 'PATCH', //'PUT'
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    },
    body: json_data
  };

  const res = await fetch(`/projects/${form_data.id}`, requestOptions).then(response => response.json())
  return res;
}

export { projectCreate, projectDelete, projectView, projectUpdate };