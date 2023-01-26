const userLogin = async (json_formdata) => {
  const requestOptions = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content"),
    },
    body: JSON.stringify(json_formdata)
  };

  const res = await fetch("/login", requestOptions).then(response => response.json())
  return res;
}

const userSignup = async (form_data) => {
  const json_data = JSON.stringify({user: form_data});
  // console.log(json_data);
  // json_data = {'user' : {'email':'email@example.com', 'password': 'password'}}
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
export { userLogin, userSignup };