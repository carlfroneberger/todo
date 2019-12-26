import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import PropTypes from 'prop-types';
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
        const {isSigningIn} = this.state;
        const {onAuthenticate} = this.props;
        let body;
        if (isSigningIn) {
            body = <SignIn
                changeModalView={this.changeToSignUp}
                onAuthenticate={onAuthenticate}
            />
        } else {
            body = <SignUp
                changeModalView={this.changeToSignIn}
                onAuthenticate={onAuthenticate}
            />
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
    // Changes the web page to authenticated view
    onAuthenticate: PropTypes.func.isRequired,
}

export default SignInOrUp;