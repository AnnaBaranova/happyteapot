import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import CartPage from "../CartPage/CartPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import userService from "../../utils/userService";
import productService from "../../utils/productService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      products: [],
    };
  }

  handleSignupOrLogin = () => {
    console.log("handleSignupOrLogin");
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    console.log("handleLogout");
    userService.logout();
    this.setState({ user: null });
  };

  async componentDidMount(){
    const products = await productService.index();
    console.log(products)
    this.setState({products})
  }

  render() {
    const { user, products } = this.state;
    return (
      <div className="App">
        <header className="container-fluid">
          <NavBar user={user} handleLogout={this.handleLogout} />
        </header>
        <main class="container-fluid">
          <Switch>
            <Route exact path="/" render={() => <HomePage products={products} />} />
            <Route
              exact
              path="/cart"
              render={() =>
                userService.getUser() ? (
                  <CartPage user={user} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route exact path="/product" render={() => <ProductPage />} />
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
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
