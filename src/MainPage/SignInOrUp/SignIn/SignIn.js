import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
const firebase = require('../../../firebase/firebaseFunctions');

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passRef = React.createRef();

        this.state = {
            isError: false,
            errorMessage: '',
        }
    }

    signInUser = () => {
        const {onAuthenticate} = this.props;

        console.log(this.emailRef.current.value);
        firebase.signIn(this.emailRef.current.value, this.passRef.current.value)
        .then((res) => {
            if (res.status === 'success') {
                onAuthenticate();
            } else if (res.status === 'failure') {
                this.setState({
                    isError: true,
                    errorMessage: res.message,
                })
            }
            console.log(res);
        })
    };
    
    render() {
        const {isError, errorMessage} = this.state;
        const errorBar = (
            <Alert variant='danger'>
                Error signing in: {errorMessage}
            </Alert>
        )
        
        const {changeModalView} = this.props;
        const linkLike = {
            color: 'blue',
            textDecoration: 'underline',
        };

        if (isError) {
            console.log('there is an error');
        }

        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Hi there, welcome back!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isError && errorBar}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                ref={this.emailRef}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                ref={this.passRef}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.signInUser}>
                            Sign in
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <p>
                        Not a user yet? Sign up&nbsp;
                        <span onClick={changeModalView} style={linkLike}>here </span>
                    </p>
                </Modal.Footer>
            </div>
        );
    }
}

SignIn.propTypes = {
    // Changes the modal view to sign up
    changeModalView: PropTypes.func.isRequired,

    // Changes the web page to authenticated view
    onAuthenticate: PropTypes.func.isRequired,
}

export default SignIn;