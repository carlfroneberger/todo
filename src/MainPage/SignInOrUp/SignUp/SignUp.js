import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import * as firebase from '../../../firebase/firebaseFunctions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        
        // Refs to name, email, and pass fields
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passRef = React.createRef();

        this.state = {
            // Controls when alert box is shown and its contents
            isError: false,
            errorMessage: '',
        }
    }

    // If the sign up is successful, uses handleAuthenticate prop to propogate
    // the authentication state upwards
    // Otherwise, sets the state to display reason for failure
    handleButtonClick = () => {
        const {handleAuthenticate} = this.props;
        
        firebase.signUp(
            this.emailRef.current.value,
            this.passRef.current.value,
            this.nameRef.current.value
        ).then((res) => {
            if (res.status === 'success') {
                this.setState({
                    isError: false,
                    errorMessage: '',
                    
                });
                handleAuthenticate();
            } else if (res.status === 'failure') {
                this.setState({
                    isError: true,
                    errorMessage: res.message,
                })
            }
        });
    }
    
    render() {
        const {isError, errorMessage} = this.state;
        const {changeModalView} = this.props;

        // CSS styling to make text appear like a link
        const linkLike = {
            color: 'blue',
            textDecoration: 'underline',
        };

        // Displays current error with account creation
        const alertBox = (
            <Alert variant='warning'>
                {errorMessage}
            </Alert>
        )

        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Welcome! Sign up here</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isError && alertBox}
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" ref={this.nameRef}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={this.emailRef}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" ref={this.passRef}/>
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleButtonClick}>
                            Sign in
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

    // Changes parent state when a user is authenticated
    handleAuthenticate: PropTypes.func.isRequired,
}

export default SignUp;