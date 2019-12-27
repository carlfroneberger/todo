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
        if (await firebase.getCurrentUser().status === 'success') {
            console.log('true');
            this.setState({isAuthenticated: true});
        } else {
            console.log('false');
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