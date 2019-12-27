import React, { Component } from 'react';
import './TodoPage.css';
import Sugar from 'sugar-date';
import firebase from '../../firebase/firebaseFunctions';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            todos: {},
        }

        // set name of user
        firebase.getCurrentUser().then((res) => {
            this.setState({name: res.name});
        });
    }
    
    render() {
        const {name} = this.state;
        const {today} = 
        return (
        <h1>Welcome, {name}</h1>
        <h2></h2>
        );
    }
}

export default TodoPage;