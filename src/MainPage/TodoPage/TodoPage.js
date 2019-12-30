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
            isNewTodoError: false,
            newTodoErrorMessage: ''
        }

        this.newTodoRef = React.createRef();

        // set name of user and current date
        // todo: this needs fixing
        firebase.getCurrentUser().then((res) => {
            this.setState({
                name: res.name,
                today: Sugar.Date('today').format('%A, %B %e, %Y').raw,
            });
        });

    }

    handleAddTodo = () => {
        const parsed = this.newTodoRef.current.value
        .split('//')
        .map((elem) => {return elem.trim()});

        if (parsed.length !== 2) {
            this.setState({
                isNewTodoError: true,
                newTodoErrorMessage: 'Cannot parse to do',
            })
        }

        const todo = parsed[0];
        let dueDate;
        try {
            dueDate = Sugar.Date(parsed[1]);
            console.log(dueDate.format().raw);
        } catch {
            this.setState({
                isNewTodoError: true,
                newTodoErrorMessage: 'Please enter a valid date',
            });
            return;
        }

        const year = dueDate.format('%Y');
        const month = dueDate.format('%m');
        const day = dueDate.format('%d');

        // to do: make this so that it adds the todo to list
        firebase.addTodo(todo, year, month, day);
    }
    
    render() {
        const {name, today} = this.state;

        return (
            <div>
                <h1>Welcome, {name}</h1>
                <h2>Today is: {today}</h2>
                <hr />

                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="What do you need to get done?"
                    aria-label="What do you need to get done?"
                    aria-describedby="basic-addon2"
                    ref={this.newTodoRef}
                    />
                    <InputGroup.Append>
                        <Button
                        variant="outline-secondary"
                        onClick={this.handleAddTodo}
                        >
                            Add todo!
                        </Button>
                    </InputGroup.Append>
                </InputGroup>


            </div>

        );
    }
}

export default TodoPage;