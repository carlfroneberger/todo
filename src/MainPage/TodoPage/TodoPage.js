import React, { Component } from 'react';
import './TodoPage.css';
import firebase from '../../firebase/firebaseFunctions';
import Sugar from 'sugar';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            todos: {},
            today: '',
        }

        // set name of user and current date
        firebase.getCurrentUser().then((res) => {
            this.setState({
                name: res.name,
                today: Sugar.Date('today').format('%A, %B %e, %Y').raw,
            });
        });

    }
    
    render() {
        const {name, today} = this.state;

        return (
            <div>
                <h1>Welcome, {name}</h1>
                <h2>Today is: {today}</h2>
                {/* todo: make this white lol */}
                <hr />
            </div>
        );
    }
}

export default TodoPage;