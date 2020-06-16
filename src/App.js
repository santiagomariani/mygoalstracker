import React from 'react';

import './App.css';
import 'typeface-roboto';

import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import NoMatchPage from './NoMatchPage'
import PrivateRoute from './PrivateRoute'
import {Switch,Route} from "react-router-dom";
import Goals from './Goals'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: localStorage.getItem('usertoken')};
  }

  tokenChanged = (token) => {
    this.setState({token: token});
  };

  render() {
    
    return (
    <Switch>
      <PrivateRoute path="/goals">
        <Goals setToken={this.tokenChanged} />
      </PrivateRoute>
      <Route path="/signup">
        <SignUpPage></SignUpPage>
      </Route>
      <Route exact path="/">
        <SignInPage setToken={this.tokenChanged}></SignInPage>
      </Route> 
      <Route>
        <NoMatchPage></NoMatchPage>
      </Route>
    </Switch>)
  }
}