import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import CartPage from "../CartPage/CartPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import userService from "../../utils/userService";
import productService from "../../utils/productService";
import NewProductPage from "../NewProductPage/NewProductPage";
import OrderPage from "../OrderPage/OrderPage";
import orderService from "../../utils/orderService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      products: [],
      cart: [],
      orders: [],
    };
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
    this.setState({ cart: this.state.user.shoppingCart });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
    this.setState({ cart: [] });
  };

  async componentDidMount() {
    await this.getProducts();
    if (this.state.user && this.state.user.shoppingCart) {
      this.setState({ cart: this.state.user.shoppingCart });
    }
  }

  getProducts = async () => {
    const products = await productService.index();
    this.setState({ products });
  };

  setCart = (cart) => {
    this.setState((prevState) => ({
      cart: cart,
      user: {
        ...prevState.user,
        shoppingCart: cart,
      },
    }));
  };

  getOrders = async () => {
    const user = this.state.user._id;
    const orders = await orderService.index(user);
    this.setState({ orders });
  };

  setOrders = (orders) => {
    this.setState({ orders });
  };

  render() {
    const { user, products, cart, orders } = this.state;
    return (
      <div className="App">
        <header className="container-fluid">
          <NavBar
            cart={this.state.cart.length}
            user={user}
            handleLogout={this.handleLogout}
          />
        </header>
        <main class="container-fluid">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <HomePage user={user} products={products} />}
            />
            <Route
              exact
              path="/users/:id/orders"
              render={() => (
                <OrderPage
                  user={user}
                  getOrders={this.getOrders}
                  orders={orders}
                  setOrders={this.setOrders}
                  products={products}
                />
              )}
            />
            <Route
              exact
              path="/cart"
              render={({ history }) =>
                userService.getUser() ? (
                  <CartPage
                    user={user}
                    setOrders={this.setOrders}
                    getOrders={this.getOrders}
                    cart={cart}
                    products={products}
                    setCart={this.setCart}
                    history={history}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/products/:id"
              render={({ history, match }) => (
                <ProductPage
                  setCart={this.setCart}
                  user={user}
                  handleUpdateProducts={this.getProducts}
                  history={history}
                  match={match}
                  products={products}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={({ history }) => (
                <SignupPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={({ history }) => (
                <LoginPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
            <Route
              exact
              path="/product"
              render={({ history }) =>
                userService.getUser() ? (
                  <NewProductPage
                    user={user}
                    handleUpdateProducts={this.getProducts}
                    history={history}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/product/:id"
              render={({ history, match }) => (
                <NewProductPage
                  handleUpdateProducts={this.getProducts}
                  history={history}
                  match={match}
                />
              )}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
