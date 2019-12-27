import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import firebase from '../../../firebase/firebaseFunctions';


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

    handleButtonClick = () => {
        const {handleAuthenticate} = this.props;
        console.log(
            this.emailRef.current.value,
            this.passRef.current.value,
        );
        firebase.signIn(this.emailRef.current.value, this.passRef.current.value)
        .then((res) => {
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
        })

    }
    
    render() {
        const {isError, errorMessage} = this.state;
        const {changeModalView} = this.props;
        
        const linkLike = {
            color: 'blue',
            textDecoration: 'underline',
        };

        const alertBox = (
            <Alert variant='warning'>
                {errorMessage}
            </Alert>
        )

        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Hi there, welcome back!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {isError && alertBox}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={this.emailRef}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Password" ref={this.passRef} />
                        </Form.Group>
                        <Button variant="primary" onClick={this.handleButtonClick}>
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

    // Changes parent state when a user is authenticated
    handleAuthenticate: PropTypes.func.isRequired,
}

export default SignIn;