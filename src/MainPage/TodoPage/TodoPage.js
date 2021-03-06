import React, { Component } from 'react';
import './TodoPage.css';
import * as firebase from '../../firebase/firebaseFunctions';
import Sugar from 'sugar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import TodoItem from './TodoItem/TodoItem';
import { ListGroup, Form } from 'react-bootstrap';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            todos: [],
            overdueTodos: [],
            today: '',
            isNewTodoError: false,
            newTodoErrorMessage: '',
            isTodoCreated: false,
            todoCreatedMessage: ''
        }

        this.newTodoRef = React.createRef();
        this.newDateRef = React.createRef();

        // set name of user and current date
        firebase.getCurrentUser().then((res) => {
            this.setState({
                name: res.name,
                today: Sugar.Date('today').format('%A, %B %e, %Y').raw,
            });
        });

        this.loadTodos();

    }

    handleAddTodo = () => {
        const todo = this.newTodoRef.current.value;
        let dueDate;
        try {
            dueDate = Sugar.Date(this.newDateRef.current.value);
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
        this.loadTodos();
        this.setState({
            isNewTodoError: false,
            isTodoCreated: true,
            todoCreatedMessage: `New to do created for ${dueDate.medium()}`});
        this.newTodoRef.current.value = '';
        this.newDateRef.current.value = '';

    }

    loadTodos = () => {
        console.log('reloading todos');
            firebase.getTodos().then((todosObj) => {
                if (todosObj === null) {
                    this.setState({todos: []});
                    return;
                }
                console.log(todosObj);
                const todosOther = Object.keys(todosObj).map((key, value) => {
                    let toReturn = todosObj[key];
                    toReturn['id'] = key;
                    return toReturn;
                });

                console.log(todosOther);
                
                const todos = Object.values(todosObj);
                console.log(todosObj);

                todos.sort((a, b) => {
                    const aParse = a.dueDate.split('-');
                    const bParse = b.dueDate.split('-');

                    if (aParse[0] > bParse[0]) {
                        return 1;
                    } else if (aParse[0] < bParse[0]) {
                        return -1;
                    }
                    else if (aParse[1] > bParse[1]) {
                        return 1;
                    } else if (aParse[1] < bParse[1]) {
                        return -1;
                    }
                    else if (aParse[2] > bParse[2]) {
                        return 1;
                    } else {
                        return -1;
                    }
                });

                let sortedTodos = [];
                let overdueTodos = [];
                let currDate = new Date();
                currDate.setHours(0,0,0,0);
                currDate.setDate(currDate.getDate() - 1);

                todos.forEach((elem) => {
                    let elemDate = new Date(elem.dueDate);
                    elemDate.setHours(0,0,0,0);
                    if (currDate > elemDate) {
                        if (!elem.completed) {
                            overdueTodos.push(elem);
                        }
                    }
                    else if (sortedTodos.length === 0) {
                        sortedTodos.push([elem]);
                    } else if (sortedTodos[sortedTodos.length -1][0].dueDate === elem.dueDate) {
                        sortedTodos[sortedTodos.length - 1].push(elem);
                    } else {
                        sortedTodos.push([elem]);
                    }
                });

                this.setState({
                    todos: sortedTodos,
                    overdueTodos,
                });
            });

    }

    makePrettyDate = (date) => {
        let currDate = Sugar.Date(date);
        if (currDate.is('today').raw) {
            return 'Today';
        } else if (currDate.is('tomorrow').raw) {
            return 'Tomorrow';
        } else {
            return currDate.format('%A %B %d, %Y').raw;
        }

    }
    
    render() {
        const {name, today, isNewTodoError, newTodoErrorMessage,
            isTodoCreated, todoCreatedMessage, todos, overdueTodos} = this.state;

        const alertBox = (
            <Alert variant='warning'>
                {newTodoErrorMessage}
            </Alert>
        )

        const todoToast = (
            <Toast
                onClose={() => {
                this.setState({
                    isTodoCreated: false,
                    todoCreatedMessage: ''
                });
                }}
                show={isTodoCreated}
                delay={10000}
                autohide
                style={{
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '10px',
                    left: '50px',
                    margin: '0 auto',

                }}>
                <Toast.Body>{todoCreatedMessage}</Toast.Body>
          </Toast>
        )

        return (
            <div style={{width: '600px'}}>
                <h1>Welcome, {name}</h1>
                <h2>Today is: {today}</h2>
                <hr />
                {isNewTodoError && alertBox}
                {isTodoCreated && todoToast}
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="What do you need to get done?"
                        aria-label="What do you need to get done?"
                        aria-describedby="basic-addon2"
                        ref={this.newTodoRef}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.handleAddTodo();
                            }
                        }}
                    />
                    <FormControl
                        placeholder="When?"
                        aria-label="When?"
                        aria-describedby="basic-addon2"
                        ref={this.newDateRef}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.handleAddTodo();
                            }
                        }}
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

                {
                    (overdueTodos.length !== 0)
                    &&
                    <div>
                        <Card style={{width: '600px'}} bg='danger' text='white'>
                            <Card.Header>Overdue</Card.Header>
                            {overdueTodos.map((todoIter) => {
                                return (
                                    <TodoItem
                                        completed={todoIter.completed}
                                        todoText={todoIter.todo}
                                        dueDate={todoIter.dueDate}
                                        id={todoIter.id}
                                        key={todoIter.id}
                                        onChange={this.loadTodos}
                                    />
                                )
                            })}
                        </Card>
                        <br />
                    </div>
                }
                {todos.map((dateTodos) => {
                    return (
                        <div>
                            <Card style={{width: '600px'}}>
                                <Card.Header>
                                    {this.makePrettyDate(dateTodos[0].dueDate)}
                                </Card.Header>
                                {dateTodos.map((todoIter) => {
                                    return (
                                        <TodoItem
                                            completed={todoIter.completed}
                                            todoText={todoIter.todo}
                                            dueDate={todoIter.dueDate}
                                            id={todoIter.id}
                                            key={todoIter.id}
                                            onChange={this.loadTodos}
                                        />
                                    )
                                })}
                            </Card>
                            <br />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default TodoPage;