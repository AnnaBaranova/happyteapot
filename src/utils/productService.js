import tokenService from "./tokenService";

const BASE_URL = "/api/products/";

function index() {
  return fetch(BASE_URL)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
}

function getOne(id) {
  return fetch(`${BASE_URL}${id}`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
}

function create(product) {
  console.log(product);
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(product),
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

function update(product) {
  console.log(product);
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(product),
  };
  return fetch(BASE_URL + product._id, options).then((res) => res.json());
}

function deleteOne(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL + id, options).then((res) => res.json());
}

function addReview(review, productId) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(review),
  };
  return fetch(BASE_URL + productId + "/reviews", options).then((res) => res.json());
}



export default {
  index,
  getOne,
  create,
  update,
  delete: deleteOne,
  addReview
};
