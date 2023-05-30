const api = (route, method, handle, body) => {
  //let url = "http://127.0.0.1:8000/api/";
  let url = "http://192.168.0.122:8000/api/";
  //let url = "http://10.21.12.216:8000/api/";

  fetch(url + route, {
    method: method,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: "Bearer 1|u7MTSBLUFvXf1D7w2pNtsQEwjNZRImbRcl4vIeBJ",
    },
    body: body,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => {
      handle(data);
    })
    .catch((errors) => {
      let err = JSON.parse(errors.message);
      console.log(errors, err);
    });
};

export default api;
