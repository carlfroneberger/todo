import React from 'react';
import './App.css';
const firebase = require('./firebase/firebaseFunctions')

function App() {
  return (
    <div className="App">
      <h1> Hello world</h1>
      <button onClick={
        () => {firebase.signUp('duasdfmb@gmaiknkjkl.com', 'person')}
      }>
        sign up test
      </button>
      <button onClick={
        () => {firebase.signIn('dumb@gmaiknkjkl.com', 'sdkjlsdf')}
      }>
        sign in test
      </button>
    </div>
  );
}

export default App;
