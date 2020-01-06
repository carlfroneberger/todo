import React, { Component } from 'react';
// import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';




class TodoItem extends Component {
    constructor(props) {
        super(props);
        const {key, id, todoText, completed} = this.props;
        this.state = {
            id,
            todoText,
            completed,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = () => {
        console.log(this.state.todoText);
        const {completed} = this.state;
        console.log('i am changing state');
        this.setState({
            completed: !completed,
        });
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