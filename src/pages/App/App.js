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
import NewProductPage from "../NewProductPage/NewProductPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      products: [],
      cart: [] 
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

  async componentDidMount() {
    await this.getProducts();
  }

  getProducts = async () => {
    const products = await productService.index();
    console.log("updateProducts");
    this.setState({ products });
  };

  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.products !== this.state.products && this.state.products.length){
  //     debugger;

  //   }

  // }

  // componentDidUpdate=  async () => {
  //   const products = await productService.index();
  //   console.log("update");
  //   this.setState({ products });
  // }

  render() {
    const { user, products } = this.state;
    return (
      <div className="App">
        <header className="container-fluid">
          <NavBar user={user} handleLogout={this.handleLogout} />
        </header>
        <main class="container-fluid">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <HomePage products={products} />}
            />
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
            {/* <Route  exact path="/products/:id" render={() => <ProductPage />} /> */}
            {/* <Route exact path="/products/:id" component={ProductPage} /> */}
            <Route
              exact
              path="/products/:id"
              render={({ history, match }) => (
                <ProductPage
                  handleUpdateProducts={this.getProducts}
                  history={history}
                  match={match}
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
              render={({ history }) => (
                <NewProductPage
                  handleUpdateProducts={this.getProducts}
                  history={history}
                />
              )}
            />
            {/* <Route exact path="/products/:id" component={NewProductPage} /> */}

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
