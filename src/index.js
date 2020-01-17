import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css';

let firebaseConfig = {
    authDomain: 'todo-35d49.firebaseapp.com',
    databaseURL: 'https://todo-35d49.firebaseio.com',
    projectId: 'todo-35d49',
    storageBucket: 'todo-35d49.appspot.com',
    messagingSenderId: '455882528849',
    appId: '1:455882528849:web:0fe683275a38378e328070',
    measurementId: 'G-8YGSLG05W5',
  };

firebaseConfig.apiKey = process.env.REACT_APP_API;

firebase.initializeApp(firebaseConfig);
console.log(firebaseConfig);
console.log(process.env.REACT_APP_API);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();