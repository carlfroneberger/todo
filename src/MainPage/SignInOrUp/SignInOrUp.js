import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

class SignInOrUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSigningIn: true,
        }
    }

    render() {
        const { isSigningIn } = this.state;
        let body;
        if (isSigningIn) {
            body = <SignIn />
        } else {
            body = <SignUp />
        }


        return (
            <Modal
                className='SignInOrUpModal'
                dialogClassName='modal-90w'
            >
                { body }
                {/* <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer> */}
            </Modal>
        );
    }
}

export default SignInOrUp;