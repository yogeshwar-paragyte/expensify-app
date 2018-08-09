import firebase from 'firebase/app';
import 'firebase/database';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtukuxm1oKfrTCrbXyumJ93OVKqGszpTg",
    authDomain: "expencify-app-18a29.firebaseapp.com",
    databaseURL: "https://expencify-app-18a29.firebaseio.com",
    projectId: "expencify-app-18a29",
    storageBucket: "expencify-app-18a29.appspot.com",
    messagingSenderId: "289550593798"
  };
  firebase.initializeApp(config);

  const database = firebase.database();


//   database.ref().set({
//     sayIt:"Hello World!!",
//     try:{
//       success:"Yeah!",
//       fail: "Oh No!"
//     }
//   }).then(() => {
//       console.log("Success!")
//   }).catch((e) =>{
//     console.log("Error: ", e)  
// });  

// database.ref().update({
//   "try/fail": "Oh, what have I done!"
// }).then(() => {
//   console.log('Success');
// }).catch((e) => {
//   console.log(e);
// })

// database.ref().once('value').then((snapshot) => {
//   console.log(snapshot.val())
// }).catch((e) => {
//   console.log(e);
// })


const onValueChange = database.ref().on(('value'), (snapshot) => {
  console.log(snapshot.val());
}, (e) => {
  console.log(e);
});

setTimeout(() => {
  database.ref().off(onValueChange);
  console.log('Now stopped watching for changes');
}, 10000);