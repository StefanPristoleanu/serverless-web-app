import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Modal, Form, FormControl, FormGroup, Alert, Col, ControlLabel } from 'react-bootstrap';

class CheckboxDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            email: '',
            password: '',
            errorCode: '',
        }
        this.clickLink = this.clickLink.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }//end constructor

    clickLink() {
        this.setState({ showDialog: true });
    }

    closeDialog() {
        this.setState({ showDialog: false, errorCode: '' });
    }


    render() {
        let errMsg = <p></p>;
        if (this.state.errorCode === 'errorLogin') {
            errMsg = <Alert bsStyle="warning">
                <strong>Incorrect username / password!</strong>
            </Alert>;
        }
        else if (this.state.errorCode === 'errorRegister') {
            errMsg = <Alert bsStyle="warning">
                <strong>Incorrect username / passwords not matching!</strong>
            </Alert>;
        }
        else if (this.state.errorCode === 'errorVerification') {
            errMsg = <Alert bsStyle="warning">
                <strong>Incorrect code!</strong>
            </Alert>;
        }
        return (
            <div style={{paddingLeft: '10px'}}>
                <Button bsStyle="link" onClick={this.clickLink} href="#">Agree to terms and conditions</Button>

                <Modal show={this.state.showDialog} onHide={this.closeDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>General Data Protection Regulations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errMsg}
                        <Form horizontal>
                            <div>
                                This website follows the standard University of Manchester personal data policy.
                                <br/>
                                The register data is safely kept in a cloud-based database, and only used for authentication.
                                One can withdraw from the website by contacting administration.
                                <br/>
                                <Button bsStyle="link" href="https://www.eugdpr.org/">Read more about GDPR here</Button>

                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeDialog}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }// render

}

export default  withRouter(CheckboxDialog);
