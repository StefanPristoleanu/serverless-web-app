import React, { Component } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { Button, Modal, Form, FormControl, FormGroup, Alert, Col, ControlLabel } from 'react-bootstrap';
import axios from 'axios';

class AddEventDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegister: false,
            email: '',
            password: '',
            password2: '',
            showAddEvent: false,
            event_name: '',
            event_capacity: '',
            event_address: '',
            event_date: '',
            event_description: '',
            errorCode: '',
        }
        this.openRegister = this.openRegister.bind(this);
        this.closeRegister = this.closeRegister.bind(this);
        this.doRegister = this.doRegister.bind(this);

        this.openAddEvent = this.openAddEvent.bind(this);
        this.closeAddEvent = this.closeAddEvent.bind(this);
        this.doAddEvent = this.doAddEvent.bind(this);
    }//end constructor

    openAddEvent() {
        this.setState({ showAddEvent: true });
    }

    closeAddEvent() {
        this.setState({ showAddEvent: false, errorCode: '' });
    }

    doAddEvent() {
        console.log('doAddEvent start ...');
        // Make a request for a user with a given ID
        let self = this;
        let data = {
            event_name: this.state.event_name,
            event_address: this.state.event_address,
            event_capacity: this.state.event_capacity,
            event_date: this.state.event_date,
            event_description: this.state.event_description,
            counter: "0"
        }
        let headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': global.jwtToken
            }
        };

        console.log("josn data sent ", JSON.stringify(data));
        axios.post(global.APIURL2, data, headers)
            .then(function (response) {
                // handle success
                console.log("Response axios post", response);
                console.log("Axios post result:" + JSON.stringify(response));
                //self.setState({ eventList: JSON.parse(response.data.body) });
                self.closeAddEvent();
            })
            .catch(function (error) {
                // handle error
                console.log("Axios error:" + JSON.stringify(error));
            })
            .then(function () {
                // always executed
            });
    }// doAddEvent

    openRegister() {
        this.setState({ showRegister: true });
    }

    closeRegister() {
        this.setState({ showRegister: false, errorCode: '' });
    }

    doRegister(evt) {
        console.log('register: ' + this.state.email + ' ' + this.state.password);
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
                self.openAddEvent();
                self.setState({ successCode: 'succRegister' });
            } else {
                //onFailure(err);
                console.log('... error register: ' + JSON.stringify(err));
                if (err.code === 'UsernameExistsException') {
                    self.openAddEvent();
                }
                self.setState({ errorCode: 'errorRegister' });
            }
        })
    }// doRegister

    render() {
        let errMsg = <div></div>;
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
            <div style={{ paddingLeft: '10px' }}>

                <Button bsStyle="success" bsSize="large" active onClick={this.openAddEvent}>
                    Add Event
                </Button>

                <Modal show={this.state.showAddEvent} onHide={this.closeAddEvent}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {errMsg}
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalCode">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="name" onChange={(event) => this.setState({ event_name: event.target.value })} />
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Date:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="date" placeholder="date" onChange={(event) => this.setState({ event_date: event.target.value })} />
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Address:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="address" onChange={(event) => this.setState({ event_address: event.target.value })} />
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Capacity:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="number" placeholder="capacity" onChange={(event) => this.setState({ event_capacity: event.target.value })} />
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" type="text" placeholder="description" onChange={(event) => this.setState({ event_description: event.target.value })} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="success" type="button" onClick={this.doAddEvent}>Add</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeAddEvent}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }// render
}

export default AddEventDialog;