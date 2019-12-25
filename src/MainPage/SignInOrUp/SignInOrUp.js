import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import './SignInOrUp.css';

class SignInOrUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSigningIn: true,
        }
    }

    changeToSignUp = () => {
        this.setState({
            isSigningIn: false,
        });
    }

    changeToSignIn = () => {
        this.setState({
            isSigningIn: true,
        });
    }

    render() {
        const { isSigningIn } = this.state;
        let body;
        if (isSigningIn) {
            body = <SignIn changeModalView={this.changeToSignUp} />
        } else {
            body = <SignUp changeModalView={this.changeToSignIn} />
        }

        return (
            <Modal
                dialogClassName='SignInOrUpModal'
                show={true}
            >
                { body }

            </Modal>
        );
    }
}

export default SignInOrUp;