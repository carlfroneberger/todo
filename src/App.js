import React from 'react';
import './App.css';
import { MainPage } from './MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
    //   <h1> Hello world</h1>
    //   <button onClick={
    //     () => {firebase.signUp('tester@test.com', 'tester', 'Carl')}
    //   }>
    //     sign up test
    //   </button>
    //   <button onClick={
    //     () => {firebase.signIn('tester@test.com', 'tester')}
    //   }>
    //     sign in test
    //   </button>

    //   <button onClick={
    //     () => {console.log(firebase.getCurrentUser())}
    //   }>
    //     current user test in test
    //   </button>
    //   <button onClick={
    //     () => {firebase.addTodo('happy 22', '2021', '03', '19')}
    //   }>
    //     test add to do 
    //   </button>
    //   <button onClick={
    //     () => {firebase.getTodos()}
    //   }>
    //     test get todos
    //   </button>
    //   <button onClick={
    //     () => {
    //       firebase.updateTodo('-Lwj6Otv-wGIbbwiZ-37', 'updated todo i guess', '2015', '05', '01', false);
    //     }
    //   }>
    //     test update todo
    //   </button>
    // </div>
  );
}

export default App;
