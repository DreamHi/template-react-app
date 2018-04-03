import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import SLogin from './modules/system/scenes/SLogin';
import SHome  from './modules/system/scenes/SHome';
import SNotFound  from './modules/system/scenes/SNotFound';

import storage from './util/storage';
import { ROUTE_HOME, ROUTE_LOGIN } from "./util/constants";

const rootElement = document.getElementById('root');

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => storage.isAuthenticatedUser()
        ? <Component {...props} />
        : <Redirect to={ ROUTE_LOGIN } />}
    />
  )
};

const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => !storage.isAuthenticatedUser()
        ? <Component {...props} />
        : <Redirect to={ ROUTE_HOME } />}
    />
  )
};

ReactDOM.render(
  <Router>
    <PublicRoute path='/' component={SLogin} />
    <PublicRoute path={ ROUTE_LOGIN } component={SLogin} />
    <PrivateRoute path={ ROUTE_HOME } component={SHome} />
    <Route path="*" component={SNotFound} />
  </Router>,
  rootElement,
);