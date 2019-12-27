import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth';
import "firebase/storage";
const  config = {
    apiKey: "AIzaSyBOjePErZKi3pXZEeo9uZGwxp-BaP1cJR0",
    authDomain: "sokoleo-e6620.firebaseapp.com",
    databaseURL: "https://sokoleo-e6620.firebaseio.com",
    projectId: "sokoleo-e6620",
    storageBucket: "sokoleo-e6620.appspot.com",
    messagingSenderId: "1065457542399",
    appId: "1:1065457542399:web:2ead50b36b016ea98ed8ca",
    measurementId: "G-KHJ0K8VN5T"
  };
  // // Initialize Firebase
  
  firebase.initializeApp(config);
   firebase.storage();
  firebase.firestore().settings({timestampsInSnapshots:true});

  export { firebase as default };
 