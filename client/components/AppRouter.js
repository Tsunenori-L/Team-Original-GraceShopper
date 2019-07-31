import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Header from './Header/Header';
import AccountProfile from './Header/Navbar/AccountProfile';
import Login from './login/Login';
import MainProducts from './Products/MainProducts';
import DataDevices from './Products/DataDevices';
import Computers from './Products/Computers';
import TypeWriters from './Products/TypeWriters';

import axios from 'axios';

import { changeLoginStatus, gotUser } from './../redux';

const AppRouter = props => {
  // grab login info from local storage and parse
  let localStorageLoginStatus = window.localStorage.getItem('isLoggedIn');
  if (localStorageLoginStatus === 'true') {
    props.changeLogin(true);
  }
  let localStorageUserInfo = window.localStorage.getItem('userInfo');
  if (localStorageUserInfo) {
    localStorageUserInfo = JSON.parse(localStorageUserInfo);
    props.setUserInfo(localStorageUserInfo);
  }

  // check if session is active every 15 minutes and on page load
  setInterval(
    (function checkSession() {
      console.log('checking session');
      if (localStorageUserInfo && localStorageUserInfo.profile.user_id) {
        const userId = localStorageUserInfo.profile.user_id;
        axios.get(`/api/users/${userId}`).then(res => {
          if (!res.data.isActiveSession) {
            window.localStorage.clear();
          }
        });
      }
      return checkSession;
    })(),
    15 * 60 * 1000
  );

  // remove Test component

  const Test = () => {
    return (
      <div>
        <p>Home sweet home</p>
      </div>
    );
  };
  return (
    <div id='main-container'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Test} />
          <Route exact path='/account' component={AccountProfile} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/products' component={MainProducts} />
          <Route exact path='/1' component={Computers} />
          <Route exact path='/2' component={TypeWriters} />
          <Route exact path='/3' component={DataDevices} />
        </Switch>
      </Router>
    </div>
  );
};

const mapDispatch = dispatch => ({
  changeLogin: status => dispatch(changeLoginStatus(status)),
  setUserInfo: user => dispatch(gotUser(user)),
});
export default connect(
  null,
  mapDispatch
)(AppRouter);
