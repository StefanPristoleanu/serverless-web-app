import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicHome from './Pages/PublicHome.js';
import UserHome from './Pages/UserHome.js';
import News from './Pages/News.js';


class App extends Component {
  constructor(props) {
    super(props);
    global.poolDataCfg = {
      UserPoolId: '', //_config.cognito.userPoolId,
      ClientId: '', //_config.cognito.userPoolClientId
      //Region: 'us-east-1'
    };
    //AWS LAmbda function API for getting all of the events from the database
    global.APIURL1 = '';
    //AWS LAmbda function API for adding a new event
    global.APIURL2 = '';
    //AWS LAmbda function API for increasing the enroll counter of an event
    global.APIURL3 = '';
    global.isLogin = false;
  }

  componentWillMount(){
    if (localStorage.getItem('userData') !== null) {
      let userData = JSON.parse(localStorage.getItem('userData'));
      // accept 15 min timeout in browser until relogin
      if (Date.now() - userData.lastLoginDate < 15 * 60 * 1000) {
        global.isLogin = true;
        global.jwtToken = userData.jwtToken;
      }
    }
  }

  myRouterSwitch() {
    let myHomePage = <PublicHome />;
    if (global.isLogin) {
      myHomePage = <UserHome />
    }
    return (
      <Switch>
        <Route exact path="/" component={PublicHome} />
        <Route path="/home" component={UserHome} />
        <Route path="/news" component={News} />
      </Switch>
    );
  }//end myRouterSwitch
  handleSelect(eventKey) {
    //event.preventDefault();
    alert(`selected ${eventKey}`);
  }
  render() {
    let routerSwitch = this.myRouterSwitch();


    return (
      <div className="App">
        <Router history={Router.HistoryLocation} >
          {routerSwitch}
        </Router>
      </div>
    );
  }
}

export default App;
