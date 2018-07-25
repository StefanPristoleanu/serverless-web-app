import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Modal, Form, FormControl, FormGroup, Alert, Col, ControlLabel, Checkbox } from 'react-bootstrap';
import CheckboxDialog from './CheckboxDialog';

class RegisterDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegister: false,
            email: '',
            password: '',
            password2: '',
            showVerification: false,
            verificationCode: '',
            errorCode: '',
            checkInput:false
        }
        this.openRegister = this.openRegister.bind(this);
        this.closeRegister = this.closeRegister.bind(this);
        this.doRegister = this.doRegister.bind(this);

        this.openVerification = this.openVerification.bind(this);
        this.closeVerification = this.closeVerification.bind(this);
        this.doVerification = this.doVerification.bind(this);
        this.doCheck = this.doCheck.bind(this);
        this.changeCheck = this.changeCheck.bind(this);
    }//end constructor

    openVerification() {
        this.setState({ showVerification: true });
    }

    closeVerification() {
        this.setState({ showVerification: false, errorCode: '' });
    }

    doVerification() {
        console.log('doVerification start ...');
        const userData = {
            Username: this.state.email,
            Pool: new CognitoUserPool(global.poolDataCfg)
        }
        let self = this;
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(this.state.verificationCode, true, function (err, result) {
            if (!err) {
                //onSuccess(result);
                console.log('success confirmation: ' + JSON.stringify(result));
                self.closeVerification();
                self.closeRegister();
                self.setState({ successCode: 'succVerification' });
            } else {
                //onFailure(err);
                console.log('... error confirmation: ' + JSON.stringify(err));
                self.setState({ errorCode: 'errorVerification' });
            }
        });
    }// doVerification


    openRegister() {
        this.setState({ showRegister: true });
    }

    closeRegister() {
        this.setState({ showRegister: false, errorCode: '' });
    }

    doCheck(){
        console.log(this.state.checkInput);
    }
    changeCheck(){
        if(this.state.checkInput === true)
            this.state.checkInput = false;
        else
            this.state.checkInput = true;
    }
    doRegister(evt) {
        if(this.state.checkInput === false){
            this.setState({ errorCode: 'errorCheck' });
            return;
        }
        console.log('register: ' + this.state.email + ' ' + this.state.password );
        let userPool = new CognitoUserPool(global.poolDataCfg);

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: this.state.email
            })
        ]
        let self = this;
        userPool.signUp(this.state.email, this.state.password, attributeList, null, (err, result) => {
            if (!err) {
                //onSuccess(result);
                console.log('success register: ' + JSON.stringify(result));
                self.openVerification();
                self.setState({ successCode: 'succRegister' });
            } else {
                //onFailure(err);
                console.log('... error register: ' + JSON.stringify(err));
                if (err.code === 'UsernameExistsException') {
                    self.openVerification();
                }
                self.setState({ errorCode: 'errorRegister' });
            }
        })
    }// doRegister

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
        else if (this.state.errorCode === 'errorCheck') {
            errMsg = <Alert bsStyle="warning">
                <strong>Please agree to the GDPR by ticking the box</strong>
            </Alert>;
        }
        return (
            <div style={{paddingLeft: '10px'}}>
                
                <Button bsStyle="success" bsSize="large" active onClick={this.openRegister}>
                    Register
                </Button>

                <Modal show={this.state.showRegister} onHide={this.closeRegister}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errMsg}
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword2">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Retype password:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Retype password" onChange={(event) => this.setState({ password2: event.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formCheckbox">
                                <Col componentClass={ControlLabel} sm={2}>
                                <CheckboxDialog />

                                </Col>
                                <Col sm={10}>
                                <Checkbox style={{paddingLeft: '150px'}} inline onClick={this.changeCheck}>                
                                </Checkbox>

                                </Col>
                                
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="success" type="button" onClick={this.doRegister}>Sign in</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeRegister}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showVerification} onHide={this.closeVerification}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please check your email for the verification code</p>
                        {errMsg}
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalCode">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Code:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="code" onChange={(event) => this.setState({ verificationCode: event.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="success" type="button" onClick={this.doVerification}>Verify</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeVerification}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }// render
}

export default withRouter(RegisterDialog);