import React from 'react';
import './App.css';
const firebase = require('./firebase/firebaseFunctions')

function App() {
  return (
    <div className="App">
      <h1> Hello world</h1>
      <button onClick={
        () => {firebase.signUp('tester@test.com', 'tester', 'Carl')}
      }>
        sign up test
      </button>
      <button onClick={
        () => {firebase.signIn('test@test.com', 'test')}
      }>
        sign in test
      </button>

      <button onClick={
        () => {console.log(firebase.getCurrentUser())}
      }>
        current user test in test
      </button>
    </div>
  );
}

export default App;
