import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function addToOrder(userId, shipping, payment, cart) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify({
      items: cart,
      isPaid: false,
      isShipped: false,
      shippingAddress: shipping,
      paymentMethod: payment,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
  };
  return fetch(BASE_URL + userId + "/orders", options).then((res) =>
    res.json()
  );
}

function index(userId) {
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL + userId + "/orders", options)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
}

function cancelOrder(userId, orderId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL + userId + "/orders/" + orderId, options).then((res) =>
    res.json()
  );
}

export default {
  addToOrder,
  index,
  cancelOrder,
};
