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

        // set name of user
        firebase.getCurrentUser().then((res) => {
            this.setState({name: res.name});
        });
    }
    
    render() {
        const {name} = this.state;

        // console.log(Date.range('Tuesday from 1pm to 4pm').hours());
        return (
            <div>
                <h1>Welcome, {name}</h1>
                <h2>Today is: </h2>
            </div>
        );
    }
}

export default TodoPage;