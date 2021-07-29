import React, { Component} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage'
import ProductPage from '../../pages/ProductPage/ProductPage'
import SignupPage from '../../pages/SignupPage/SignupPage'



class App extends Component {

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>H A P P Y  &nbsp;&nbsp;&nbsp; T E A P O T </h1>
        <Switch>
          <Route exact path='/' render={()=>
          <HomePage />
        } />

        <Route exact path='/product' render={()=>
          <ProductPage />
        } />
        <Route exact path='/signup' render={()=>
          <SignupPage />
        } />
        </Switch>
      </header>
    </div>
  );
}
}

export default App;
