import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

import RegisterDialog from '../Components/RegisterDialog.js';
import LoginDialog from '../Components/LoginDialog.js';
import NavBar from '../Components/NavBar.js';
import Footer from '../Components/Footer.js';

import { Button, ButtonToolbar, ButtonGroup, Alert, Panel } from 'react-bootstrap';
import AddEventDialog from '../Components/AddEventDialog.js';

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorCode: '',
            successCode: '',
            eventList: []
        };

        this.doCheckAuth = this.doCheckAuth.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.buildEventList = this.buildEventList.bind(this);
        this.doEnroll = this.doEnroll.bind(this);
    }//end constructor

    componentDidMount() {
        if (!global.isLogin) {
            this.props.history.push('/');
            return;
        }
        this.buildEventList();
    }

    buildEventList() {
        // Make a request for a user with a given ID
        let self = this;
        axios.get(global.APIURL1, {
            headers: {
                "Authorization": global.jwtToken
            }
        })
            .then(function (response) {
                // handle success
                console.log("Axios get result:" + response.data.body);
                self.setState({ eventList: JSON.parse(response.data.body) });
            })
            .catch(function (error) {
                // handle error
                console.log("Axios error:" + JSON.stringify(error));
            })
            .then(function () {
                // always executed
            });
    }

    doCheckAuth() {
        console.log('doCheckAuth start ...');
        var userPool = new CognitoUserPool(this.state.poolData);
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    //alert(err);
                    console.log('doCheckAuth  error at session validity: ' + err);
                    return;
                }
                console.log('doCheckAuth OK session validity: ' + session.isValid());
            });
        } else {
            console.log('... doCheckAuth - cognitoUser is null ...');
        }
    }// doCheckAuth


    doLogout() {
        console.log('doLogout start ...');
        var userPool = new CognitoUserPool(global.poolDataCfg);
        var cognitoUser = userPool.getCurrentUser();
        let self = this;
        if (cognitoUser != null) {
            cognitoUser.signOut();
            console.log('doLogout - signOut');
            self.setState({ successCode: 'succLogout' });
            global.isLogin = false;
            localStorage.removeItem('userData');
            self.props.history.push('/');
        } else {
            console.log('... doLogout - cognitoUser is null ...');
        }
    }

    doEnroll(date) {
        console.log('doEnroll start ...');
        // Make a request for a user with a given ID
        let self = this;
        let data = {
            event_date: date,
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
                self.buildEventList();
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

        let succMsg = <div></div>;
        if (this.state.successCode === 'succLogin') {
            succMsg = <Alert bsStyle="success">
                <strong>Successful Login</strong>
            </Alert>;
        }
        else if (this.state.successCode === 'succRegister') {
            succMsg = <Alert bsStyle="success">
                <strong>Successful Register</strong>
            </Alert>;
        }
        else if (this.state.successCode === 'succVerification') {
            succMsg = <Alert bsStyle="success">
                <strong>Successful Verification</strong>
            </Alert>;
        }
        else if (this.state.successCode === 'succLogout') {
            succMsg = <Alert bsStyle="success">
                <strong>Successful Logout!</strong>
            </Alert>;
        }
        console.log("Length = " + this.state.eventList.length);
        let panelEvents = [];
        for (let i = 0; i < this.state.eventList.length; i++) {
            panelEvents.push(<Panel key={i}>
                <Panel.Heading responsive="true">
                    <Panel.Title componentClass="h3">{this.state.eventList[i].event_name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body responsive="true">
                    <p>Event date: {this.state.eventList[i].event_date}</p>
                    <p>Event capacity: {this.state.eventList[i].event_capacity}</p>
                    <p>Event address: {this.state.eventList[i].event_address}</p>
                    <p>Event description: {this.state.eventList[i].event_description}</p>
                    <p>People going: {this.state.eventList[i].counter}</p>
                    <Button bsStyle="primary" bsSize="large" active onClick={() => this.doEnroll(this.state.eventList[i].event_date)}>
                        Enroll
                    </Button>
                </Panel.Body>
            </Panel>);
        }

        return (
            <div>
                <ButtonToolbar>
                    <NavBar />
                </ButtonToolbar>
                <ButtonGroup bsSize="large">
                    <Button onClick={this.buildEventList}>Reload</Button>
                    <Button onClick={this.doLogout}>Logout</Button>
                </ButtonGroup>
                <h3> User Page </h3>
                {succMsg}
                <p className="App-intro">
                    To get started, you can view and join existing events or add new ones 
                    <AddEventDialog />
                </p>
                {panelEvents}
                <Footer />
            </div>
        );
    }

}

export default withRouter(UserHome);