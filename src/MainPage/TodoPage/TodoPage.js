import React, { Component } from 'react';
import './TodoPage.css';
import firebase from '../../firebase/firebaseFunctions';
import Sugar from 'sugar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import TodoItem from './TodoItem/TodoItem';
import { ListGroup } from 'react-bootstrap';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            todos: [],
            today: '',
            isNewTodoError: false,
            newTodoErrorMessage: '',
            isTodoCreated: false,
            todoCreatedMessage: ''
        }

        this.newTodoRef = React.createRef();

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
        const parsed = this.newTodoRef.current.value
        .split('//')
        .map((elem) => {return elem.trim()});

        if (parsed.length !== 2) {
            this.setState({
                isNewTodoError: true,
                newTodoErrorMessage: 'Cannot parse to do',
            })
            return;
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
        this.loadTodos();
        this.setState({
            isNewTodoError: false,
            isTodoCreated: true,
            todoCreatedMessage: `New to do created for ${dueDate.medium()}`});
        this.newTodoRef.current.value = '';

    }

    loadTodos = () => {
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
                todos.forEach((elem) => {
                    if (sortedTodos.length === 0) {
                        sortedTodos.push([elem]);
                    } else if (sortedTodos[sortedTodos.length -1][0].dueDate === elem.dueDate) {
                        sortedTodos[sortedTodos.length - 1].push(elem);
                    } else {
                        sortedTodos.push([elem]);
                    }
                });
                this.setState({todos: sortedTodos});
            });
    }
    
    render() {
        const {name, today, isNewTodoError, newTodoErrorMessage,
            isTodoCreated, todoCreatedMessage, todos} = this.state;

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
                    left: 0,
                    right: 0,
                    margin: '0 auto',

                }}>
                <Toast.Body>{todoCreatedMessage}</Toast.Body>
          </Toast>
        )

        return (
            <div>
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
                    <InputGroup.Append>
                        <Button
                        variant="outline-secondary"
                        onClick={this.handleAddTodo}
                        >
                            Add todo!
                        </Button>
                    </InputGroup.Append>
                </InputGroup>

                {todos.map((dateTodos) => {
                    return (
                        <Card style={{width: '600px'}}>
                            <Card.Header>{dateTodos[0].dueDate}</Card.Header>
                            {dateTodos.map((todoIter) => {
                                console.log(todoIter);
                                return (
                                    <TodoItem
                                        completed={todoIter.completed}
                                        todoText={todoIter.todo}
                                        dueDate={todoIter.dueDate}
                                        id={todoIter.id}
                                        key={todoIter.id}
                                    />
                                )
                            })}
                        </Card>
                    )
                })}
            </div>
        );
    }
}

export default TodoPage;