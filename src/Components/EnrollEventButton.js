import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Modal, Form, FormControl, FormGroup, Alert, Col, ControlLabel } from 'react-bootstrap';

class EnrollEventButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            email: '',
            password: '',
            errorCode: '',
        }
        this.openEnroll = this.openEnroll.bind(this);
        this.closeEnroll = this.closeEnroll.bind(this);
        this.doEnroll = this.doEnroll.bind(this);
    }//end constructor

    openEnroll() {
        this.setState({ showLogin: true });
    }

    closeEnroll() {
        this.setState({ showLogin: false, errorCode: '' });
    }

    doEnroll() {
        console.log('doEnroll start ...');
        // Make a request for a user with a given ID
        let self = this;
        let data = {
            event_date: this.state.event_date,
        }
        let headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': global.jwtToken
            }
        };

        console.log("josn data sent ", JSON.stringify(data));
        axios.post(global.APIURL3, data, headers)
            .then(function (response) {
                // handle success
                console.log("Response axios post", response);
                console.log("Axios post result:" + JSON.stringify(response));
                //self.setState({ eventList: JSON.parse(response.data.body) });
                self.closeEnroll();
            })
            .catch(function (error) {
                // handle error
                console.log("Axios error:" + JSON.stringify(error));
            })
            .then(function () {
                // always executed
            });
    }// doEnroll


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
                <Button bsStyle="danger" bsSize="large" active onClick={this.openEnroll}>
                    Enroll
                </Button>
            </div>
        )
    }// render

}

export default  withRouter(EnrollEventButton);
