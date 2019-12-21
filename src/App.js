import React from 'react';
import './App.css';
const firebase = require('./firebase/firebaseFunctions')

function App() {
  return (
    <div className="App">
      <h1> Hello world</h1>
      <button onClick={
        () => {firebase.signUp('dumb@gmaiknkjkl.com', 'person')}
      }>
        Hi
      </button>
    </div>
  );
}

export default App;
