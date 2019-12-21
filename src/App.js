import React from 'react';
import './App.css';
const firebaseFunctions = require('./firebase/firebaseFunctions')

function App() {
  return (
    <div className="App">
      <h1> Hello world</h1>
      <button onClick={firebaseFunctions.sayHello}> Hi </button>
    </div>
  );
}

export default App;
