import React from 'react';
import {  Switch,Route } from 'react-router';
import firebase from 'firebase'
import { Link,BrowserRouter, useHistory } from 'react-router-dom'
import SignUp from './login/SignUp'
import App from '../App'
import Auth from './login/Authorize'
import Login from './login/login';
import { Component } from 'react';

var user = firebase.auth().onAuthStateChanged

const AllRoute = () => (
  

            <BrowserRouter>
    <Switch>
              <Route exact path="/login" component={Login} />
              { user &&
<Route  path="/app" render={(props) => <App {...props}/> }/>
              }
              <Route exact path="/register" component={SignUp} />

            </Switch>
            </BrowserRouter>
        
    
)
export default AllRoute;