import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
const firebase = require('../../../firebase/firebaseFunctions');

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passRef = React.createRef();

        this.state = {
            isError: false,
            errorMessage: '',
        }
    }

    signUpUser = () => {
        const {onAuthenticate} = this.props;
        firebase.signUp(
            this.emailRef.current.value,
            this.passRef.current.value,
            this.nameRef.current.value
        )
        .then((res) => {
            console.log(res);
            if (res.status === 'success') {
                console.log('we have success status');
                onAuthenticate();
            } else if (res.status === 'failure') {
                console.log('we have failure status');
                this.setState({
                    isError: true,
                    errorMessage: res.message,
                })
            }
        });
    }
    
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
                    <Modal.Title>Welcome! Sign up here</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isError && errorBar}
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                ref={this.nameRef}
                            />
                        </Form.Group>

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
                                placeholder="Enter password"
                                ref={this.passRef}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.signUpUser}>
                            Sign up
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <p>
                        Already have an account? Sign in&nbsp;
                        <span onClick={changeModalView} style={linkLike}>here </span>
                    </p>
                </Modal.Footer>
            </div>
        );
    }
}

SignUp.propTypes = {
    // Changes the modal view to sign in
    changeModalView: PropTypes.func.isRequired,

    // Changes the web page to authenticated view
    onAuthenticate: PropTypes.func.isRequired,
}

export default SignUp;