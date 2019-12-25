import React, { Component } from 'react';
const firebase = require('../firebase/firebaseFunctions');

export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        }
    }

    setAuthenticationState = async () => {
        if (await firebase.getCurrentUser().status === 'success') {
            console.log('true');
            this.setState({isAuthenticated: true});
        } else {
            console.log('false');
        }
    }
    
    render() {
        this.setAuthenticationState();
        const { isAuthenticated } = this.state;
        if (isAuthenticated) {
            return (
                <h1>
                    We're authenticated
                </h1>
            );
        }
        return (
            <h1>
                We aren't authenticated;
            </h1>
        );
    }
}

export default MainPage;