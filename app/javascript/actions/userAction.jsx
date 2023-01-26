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

export { userLogin };