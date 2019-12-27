import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import firebase from '../../../firebase/firebaseFunctions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passRef = React.createRef();

        this.state = {
            success: true,
        }
    }

    handleButtonClick = () => {
        firebase.signUp(
            this.emailRef.current.value,
            this.passRef.current.value,
            this.nameRef.current.value
        ).then((res) => {
            console.log(res);
        });
    }
    
    render() {
        const {changeModalView} = this.props;
        const linkLike = {
            color: 'blue',
            textDecoration: 'underline',
        };

        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Welcome! Sign up here</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                            <Form.Control type="text" placeholder="Enter password" ref={this.passRef}/>
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
}

export default SignUp;