import React, { Component } from 'react';
import SignInOrUp from './SignInOrUp/SignInOrUp';
import TodoPage from './TodoPage/TodoPage';
import actualFirebase from 'firebase';

export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        }
    }

    componentDidMount() {
        this.authFirebaseListener = actualFirebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isAuthenticated: true,
                });
            }
            this.setState({
                isAuthenticate: false,
            });
        })
    }

    componentWillUnmount() {
        this.authFirebaseListener && this.authFirebaseListener() // Unlisten it by calling it as a function
     };

    // Sets authentication state to true
    // For use when user signs in or signs up
    handleAuthenticate= () => {
        this.setState({
            isAuthenticated: true,
        });
    }
    
    render() {
        const { isAuthenticated } = this.state;
        if (isAuthenticated) {
            return <TodoPage />
        }
        return <SignInOrUp handleAuthenticate={this.handleAuthenticate} />;
    }
}

export default MainPage;