import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAUZgz2rm1IeYgk9Q2ws3uq0vYiH8E5HJM",
    authDomain: "todo-35d49.firebaseapp.com",
    databaseURL: "https://todo-35d49.firebaseio.com",
    projectId: "todo-35d49",
    storageBucket: "todo-35d49.appspot.com",
    messagingSenderId: "455882528849",
    appId: "1:455882528849:web:0fe683275a38378e328070",
    measurementId: "G-8YGSLG05W5"
  };


firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();