import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: true,
        }
    }
    
    render() {
        return (
            <div>
                <Modal.Header>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Form>    
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Sign Up</Button>
                    <Button variant="primary">Log in</Button>
                </Modal.Footer>
            </div>
        );
    }
}

export default SignIn;