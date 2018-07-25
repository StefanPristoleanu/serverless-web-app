import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import RegisterDialog from '../Components/RegisterDialog.js';
import LoginDialog from '../Components/LoginDialog.js';
import NavBar from '../Components/NavBar.js';
import Footer from '../Components/Footer.js';

import { ButtonToolbar, Alert, Jumbotron, Button, Carousel } from 'react-bootstrap';

class PublicHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCode: '',
      successCode: ''
    };

    this.openEvents = this.openEvents.bind(this);
  }//end constructor

  openEvents() {
    this.props.history.push('/home');
  }
  componentWillMount() {

  }


  render() {

    let succMsg = <p></p>;
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

    return (
      <div>
        <ButtonToolbar>
          <NavBar />
        </ButtonToolbar>
        <Jumbotron>
          <h2>Hello, [template] enthusiast!</h2>
          {succMsg}
          <p>
            This is a web app, meant to serve as a starting point to creating a University of Manchester society website.
          </p>
          <p>
            <Button bsStyle="primary" onClick={this.openEvents}>Sign in to view events</Button>
          </p>
        </Jumbotron>
        <p className="App-intro">
          Nunc sed sagittis turpis. Nulla facilisi. Etiam tincidunt interdum tortor at laoreet. Fusce augue neque, finibus id nibh a, consequat dignissim velit. Duis id tellus suscipit, dapibus velit a, blandit lectus. Vestibulum id tristique felis.
        </p>
        <div align="center">
          <Carousel style={{ width: 900, height: 500 }}>
            <Carousel.Item>
              <img style={{ width: 900, height: 500 }} alt="900x500" src="/img/carousel1.png" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img style={{ width: 900, height: 500 }} alt="900x500" src="/img/carousel2.png" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img style={{ width: 900, height: 500 }} alt="900x500" src="/img/carousel3.png" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(PublicHome);