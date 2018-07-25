import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Modal, Form, FormControl, FormGroup, Alert, Col, ControlLabel } from 'react-bootstrap';

class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            email: '',
            password: '',
            errorCode: '',
        }
        this.openLogin = this.openLogin.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }//end constructor

    openLogin() {
        this.setState({ showLogin: true });
    }

    closeLogin() {
        this.setState({ showLogin: false, errorCode: '' });
    }

    doLogin() {
        console.log('doLogin start ...' + this.state.email);
        if (this.state.email.trim() === '') {
            this.closeLogin();
            return;
        }
        const userData = {
            Username: this.state.email,
            Pool: new CognitoUserPool(global.poolDataCfg)
        }
        const cognitoUser = new CognitoUser(userData);
        const authenticationData = {
            Username: this.state.email,
            Password: this.state.password
        }
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        let self = this;
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('success login: ' + JSON.stringify(result));
                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                let jwtToken = '';
                if (result.idToken !== undefined) {
                    jwtToken = result.idToken.jwtToken;
                }
                console.log('---> jwtToken: ' + jwtToken);
                self.closeLogin();
                self.setState({ successCode: 'succLogin' });
                global.isLogin = true;
                global.jwtToken = jwtToken;
                let userData = {
                    jwtToken: jwtToken,
                    lastLoginDate: Date.now()
                }
                //Save in local storage the user data
                localStorage.setItem('userData', JSON.stringify(userData));
                //console.log('--->redirect to user homepage ....');
                self.props.history.push('/home');  // browser redirect to home page for user after login ...
            },
            onFailure: function (err) {
                console.log('... error login: ' + JSON.stringify(err));
                self.setState({ errorCode: 'errorLogin' });
            }
        });
    }// doLogin

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
                <Button bsStyle="primary" bsSize="large" active onClick={this.openLogin}>
                    Login
                </Button>

                <Modal show={this.state.showLogin} onHide={this.closeLogin}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
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
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="primary" type="button" onClick={this.doLogin}>Login</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeLogin}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }// render

}

export default  withRouter(LoginDialog);
