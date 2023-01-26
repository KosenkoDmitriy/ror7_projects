const userLogin = async (form_data) => {
  console.log('userLogin', form_data);
  const json_data = JSON.stringify({user: form_data});
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

  const res = await fetch("/login", requestOptions).then(response => response.json())
  return res;
}

const userSignup = async (form_data) => {
  console.log('userSignup', form_data);
  const json_data = JSON.stringify({user: form_data});
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

  const res = await fetch("/sign_up", requestOptions).then(response => response.json())
  return res;
}

const userLogout = async (form_data) => {
  console.log('userLogout', form_data);
  const json_data = JSON.stringify({sign_in: form_data});
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

  const res = await fetch("/logout", requestOptions).then(response => response.json())
  return res;
}
export { userLogin, userSignup, userLogout };