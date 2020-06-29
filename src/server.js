const functions = require('firebase-functions');
const express = require('express')
const app = express()
const port = 3005;
const cors = require('cors');
//const { Authorize } = require('./server/Authorize');
const { signup } = require('./server/users'); 
const { login } = require('./server/users');
const { logout } = require('./server/users');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// parse application/json
app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/signUp',signup);
app.post('/login', login);
app.get('/signOut',logout);
//app.get('/authorize', Authorize, getAuthenticatedUser);  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
