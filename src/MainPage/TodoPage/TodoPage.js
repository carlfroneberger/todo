import React, { Component } from 'react';
import './TodoPage.css';
import firebase from '../../firebase/firebaseFunctions';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            todos: {},
        }

        firebase.getCurrentUser().then((res) => {
            this.setState({name: res.name});
        });
    }
    
    render() {
        const {name} = this.state;
        return (
        <h1>Welcome, {name}, here are your todos: </h1>
        );
    }
}

export default TodoPage;