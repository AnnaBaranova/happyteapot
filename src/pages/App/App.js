import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="container-fluid">
          <NavBar />
        </header>
        <main class="container-fluid">
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/product" render={() => <ProductPage />} />
            <Route exact path="/signup" render={() => <SignupPage />} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;

