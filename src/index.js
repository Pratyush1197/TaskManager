import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Login from './Components/login/login';
import SignUp from './Components/login/SignUp';
import * as serviceWorker from './serviceWorker';
import Login from './Components/login/login';
import AllRoute from './Components/login/Allroute'
const routes = AllRoute();

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
