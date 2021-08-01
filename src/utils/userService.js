// import user from "../../models/user";
import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Email already taken!");
    })
    .then(({ token }) => {
      tokenService.setToken(token);
      console.log(token);
    });
}

function getUser() {
    console.log('user')
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
    return fetch(BASE_URL + 'login', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(creds)
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error('Bad Credentials!');
    })
    .then(({token}) => tokenService.setToken(token));
  }

  function addToCart(userId, productId, quantity){
    console.log(userId, productId)
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + tokenService.getToken(),
      },
      body: JSON.stringify({product: productId, quantity}),
    };
    return fetch(BASE_URL + userId + '/cart', options).then((res) => res.json());

  }

  function removeFromCart(userId, itemId) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + tokenService.getToken(),
      },
    };
    return fetch(BASE_URL + userId + '/cart/' + itemId, options).then((res) => res.json());
  }

  

export default {
  signup,
  getUser,
  logout,
  login,
  addToCart,
  removeFromCart
};
