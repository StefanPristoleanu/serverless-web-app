import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

import RegisterDialog from '../Components/RegisterDialog.js';
import LoginDialog from '../Components/LoginDialog.js';
import NavBar from '../Components/NavBar.js';
import Footer from '../Components/Footer.js';

import { Button, ButtonToolbar, Alert, Panel } from 'react-bootstrap';
import AddEventDialog from '../Components/AddEventDialog.js';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorCode: '',
            successCode: '',
            eventList: []
        };


    }//end constructor


    render() {


        return (
            <div>
                <ButtonToolbar>
                    <NavBar />
                </ButtonToolbar>
                <Panel bsStyle="primary" >
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">News Article 1</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales elementum est, et dapibus turpis finibus sed. Quisque a libero nec neque suscipit facilisis. Suspendisse potenti. In tempor tristique justo a dictum. Sed ipsum justo, iaculis a iaculis eu, eleifend vitae ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras mollis laoreet ullamcorper. Curabitur a justo mollis, sollicitudin arcu eu, tempus augue. Cras viverra facilisis faucibus. Quisque pharetra mauris eu ipsum porttitor varius. Duis tempus orci nec quam ullamcorper, in finibus ex feugiat. Praesent varius mauris sit amet lorem interdum rhoncus. Nam ultrices pharetra magna.</Panel.Body>
                </Panel>

                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">News Article 2</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Maecenas pharetra, felis at ullamcorper condimentum, neque massa scelerisque dolor, sed tempus ligula nulla at ligula. Quisque consequat interdum quam, a facilisis sapien lobortis ac. Sed cursus tellus quis viverra volutpat. Proin malesuada purus non dolor mollis condimentum. Suspendisse scelerisque bibendum feugiat. Curabitur cursus iaculis tempor. Mauris mattis pulvinar ligula, non pellentesque tellus tincidunt vel. Sed sed finibus metus.</Panel.Body>
                </Panel>

                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">News Article 3</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Vestibulum eu sem vulputate, posuere leo vel, scelerisque mi. Aenean vel nibh et quam interdum pharetra. Duis nec finibus lorem, ac aliquet tortor. Curabitur ullamcorper lorem ac dapibus iaculis. Vivamus pretium sem in leo feugiat venenatis. Cras rutrum erat at maximus porta. Nam vitae viverra leo. Cras id lectus leo. Nulla facilisi. Cras et blandit metus. Nulla vel arcu risus.</Panel.Body>
                </Panel>

                <Panel bsStyle="warning">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">News Article 4</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Sed suscipit orci at ipsum maximus interdum. Morbi viverra sed eros id accumsan. In dui erat, ultrices eu pretium sed, commodo in ligula. Integer a interdum purus. Aliquam eget nisl et erat aliquet sollicitudin facilisis et nulla. Integer pretium eu tortor id feugiat. Duis massa velit, semper at faucibus id, tincidunt sodales sapien. Pellentesque imperdiet massa a dolor venenatis, non blandit justo congue. Pellentesque congue accumsan facilisis. Integer elementum leo non enim venenatis venenatis dignissim sed neque. In dignissim dui ut tellus blandit, eget molestie enim vulputate. Phasellus in diam turpis.</Panel.Body>
                </Panel>

                <Panel bsStyle="danger">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">News Article 5</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Aliquam ut risus vehicula, dignissim lectus ut, luctus justo. Sed ac est nec nulla eleifend feugiat a a ante. Fusce sodales porttitor placerat. Proin eleifend orci eu urna feugiat rhoncus. In ut erat eu leo cursus varius ut sed sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam ac consectetur leo. Maecenas maximus venenatis viverra. Fusce aliquet ex condimentum ante mattis, id eleifend velit posuere.</Panel.Body>
                </Panel>
                <Footer />
            </div>
        );
    }

}

export default withRouter(News);