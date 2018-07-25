import React, { Component } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { Button, ButtonToolbar, Nav, NavItem, navInstance, Modal, Form, FormControl, FormGroup, Alert, Col, ControlLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import RegisterDialog from '../Components/RegisterDialog.js';
import LoginDialog from '../Components/LoginDialog.js';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
        }

        this.openHome = this.openHome.bind(this);
        this.openNews = this.openNews.bind(this);
        this.openEvents = this.openEvents.bind(this);
    }//end constructor

    openHome() {
        this.props.history.push('/');
    }

    openNews() {
        this.props.history.push('/news');
    }

    openEvents() {
        this.props.history.push('/home');
    }

    render() {
        var divStyle = {
            color: 'red',
            
          };
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
            <div style={{ paddingLeft: '10px',  backgroundColor: 'black'}}>


                <Nav style={divStyle} bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
                    <Button bsStyle="info" bsSize="large" active onClick={this.openHome}>
                        Home
                    </Button>
                    <Button bsStyle="default" bsSize="large" onClick={this.openNews}>
                        News
                    </Button>
                    <Button bsStyle="default" bsSize="large" onClick={this.openEvents}>
                        Events
                    </Button>
                    <div style={{ float: 'right',  backgroundColor: 'black'}}>
                        <RegisterDialog />
                    </div>
                    <div style={{ float: 'right',  backgroundColor: 'black'}}>
                        <LoginDialog />
                    </div>
                </Nav>

            </div>
        )
    }// render
}

export default withRouter(NavBar);