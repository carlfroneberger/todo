import React, { Component } from 'react';

class TodoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            todos: {},
        }
    }
    
    render() {
        return (
            <div>
                here are your todos:
            </div>
        );
    }
}

export default TodoPage;