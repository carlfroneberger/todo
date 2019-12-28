import React, { Component } from 'react';
import './TodoPage.css';
import firebase from '../../firebase/firebaseFunctions';
import Sugar from 'sugar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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

    handleAddTodo = () => {
        // well this is where it happens...
    }
    
    render() {
        const {name, today} = this.state;

        return (
            <div>
                <h1>Welcome, {name}</h1>
                <h2>Today is: {today}</h2>
                {/* todo: make this white lol */}
                <hr />

                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="What do you need to get done?"
                    aria-label="What do you need to get done?"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Add todo!</Button>
                    </InputGroup.Append>
                </InputGroup>


            </div>

        );
    }
}

export default TodoPage;