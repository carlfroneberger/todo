import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
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

    // Changes modal view from sign in to sign up
    changeToSignUp = () => {
        this.setState({
            isSigningIn: false,
        });
    }

    // Changes modal view from sign up to sign in
    changeToSignIn = () => {
        this.setState({
            isSigningIn: true,
        });
    }

    render() {
        const {isSigningIn} = this.state;
        const {handleAuthenticate} = this.props;
        let body;
        if (isSigningIn) {
            body = <SignIn changeModalView={this.changeToSignUp} handleAuthenticate={handleAuthenticate} />
        } else {
            body = <SignUp changeModalView={this.changeToSignIn} handleAuthenticate={handleAuthenticate} />
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

SignInOrUp.propTypes = {
    // Changes parent state when a user is authenticated
    handleAuthenticate: PropTypes.func.isRequired,
}

export default SignInOrUp;