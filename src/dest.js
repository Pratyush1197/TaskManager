
var firebase = require('firebase');

//Replace the firebaseConfig variable with the firebaseConfig variable copied from the web app made in your firestore sonsole (with your own credentials)
var firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXX",
  measurementId: "XXXXXXXXXXXXXXX"
};
  const base = firebase.initializeApp(firebaseConfig)
 


  module.exports = base 
