import React from 'react';
import 'typeface-roboto';
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import NoMatchPage from '../pages/NoMatchPage/NoMatchPage'
import PrivateRoute from './PrivateRoute'
import {Switch,Route} from "react-router-dom";
import Goals from '../pages/GoalsPage/Goals'

export default class Routes extends React.Component {
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