import React from 'react';
import {  Switch,Route } from 'react-router';

import { Link,BrowserRouter, useHistory } from 'react-router-dom'
import SignUp from '../login/SignUp'
import App from '../../App';
import Login from '../login/login';
import ProtectedRoute from '../login/Protected';
import { Component } from 'react';

const Authenticated = true
const AllRoute = () => (

            <BrowserRouter>
    <Switch>
              <Route exact path="/" component={Login} />
    
            <ProtectedRoute  path="/app" component={App}  />
              
              <Route exact path="/register" component={SignUp} />

            </Switch>
            </BrowserRouter>
        
    
)
export default AllRoute;