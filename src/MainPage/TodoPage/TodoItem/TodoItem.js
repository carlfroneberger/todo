import React, { Component } from 'react';
// import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as firebase from '../../../firebase/firebaseFunctions';




class TodoItem extends Component {
    constructor(props) {
        super(props);
        const {id, todoText, completed, dueDate} = this.props;
        this.state = {
            id,
            todoText,
            completed,
            dueDate
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = () => {
        const {id, todoText, completed, dueDate} = this.state;
        this.setState({
            completed: !completed,
        });
        const parsed = dueDate.split('-');
        console.log(id);
        firebase.updateTodo(id, todoText, parsed[0], parsed[1], parsed[2], !completed);
    }
    
    render() {
        const {id, todoText, completed} = this.state;

        let style;

        if (completed) {
            style = {
                color: '#777',
                textDecoration: 'line-through'
            }
        } else {
            style = {
                color: '#000',
                textDecoration: 'none'
            }
        }

        return (
            <ListGroup.Item>
                <input
                    type='checkbox'
                    id={id}
                    checked={completed}
                    onChange={this.handleChange}    
                />
                <label htmlFor={this.state.id}>
                    <span style={style}>&nbsp;{todoText}</span>
                </label>
            </ListGroup.Item>

        );
    }
}

export default TodoItem;