import React, { Component } from 'react';
import SignInOrUp from './SignInOrUp/SignInOrUp';
import TodoPage from './TodoPage/TodoPage';
const firebase = require('../firebase/firebaseFunctions');

export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        }
    }

    // If there is a user that is signed in, sets authentication state to true
    setAuthenticationState = async () => {
        const user = await firebase.getCurrentUser();
        if (user.status === 'success') {
            this.setState({isAuthenticated: true});
        } else if (user.status === 'failure') {
            this.setState({isAuthenticated: false})
        }
    }

    // Sets authentication state to true
    // For use when user signs in or signs up
    handleAuthenticate= () => {
        this.setState({
            isAuthenticated: true,
        });
    }
    
    render() {
        this.setAuthenticationState();
        const { isAuthenticated } = this.state;
        if (isAuthenticated) {
            return <TodoPage />
        }
        return <SignInOrUp handleAuthenticate={this.handleAuthenticate} />;
    }
}

export default MainPage;