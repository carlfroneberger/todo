import React, { Component } from 'react';
import SignInOrUp from './SignInOrUp/SignInOrUp';
const firebase = require('../firebase/firebaseFunctions');

export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        }
    }

    setInitialAuthenticationState = async () => {
        if (await firebase.getCurrentUser().status === 'success') {
            console.log('true');
            this.setState({isAuthenticated: true});
        } else {
            console.log('false');
        }
    }

    onAuthenticate = () => {
        this.setState({
            isAuthenticated: true,
        })
    }


    
    render() {
        this.setInitialAuthenticationState();
        const { isAuthenticated } = this.state;
        if (isAuthenticated) {
            return <h1>We are authenticated</h1>
        }
        return <SignInOrUp onAuthenticate={this.onAuthenticate} />;
    }
}

export default MainPage;