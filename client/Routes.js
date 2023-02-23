/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Entries from './components/Entries';
import Settings from './components/Settings';
import { me } from './store';

/**
 * COMPONENT
 */
function Routes() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const loadInitialData = () => dispatch(me());
  const isLoggedIn = !!auth.id;

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/entries" component={Entries} />
          <Route path="/settings" component={Settings} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/*" exact component={Login} />
        </Switch>
      )}
    </div>
  );
}

export default Routes;
