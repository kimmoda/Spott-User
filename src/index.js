import { createHashHistory } from 'history';
import React from 'react';
import { Router, Route, useRouterHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux-immutablejs';
import { routerReducer as routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { doInit } from './actions';
import createStore from './createStore';

import appReducer from './reducer';
import App from './view/app';
import Error404 from './view/error404';
import Privacy from './view/privacy';
import Terms from './view/terms';

/**
 * The application routes
 */
const getRoutes = ({ getState }) => { // eslint-disable-line react/prop-types
  return (
    <Route component={App}>
      <Route component={Privacy} path='/privacy' />
      <Route component={Terms} path='/terms' />
      <Route component={Error404} path='*' />
    </Route>
  );
};

/**
 * The application's main reducer
 */
const reducer = combineReducers({
  app: appReducer,
  router: routerReducer
});

/**
 * Bootstrap the application. Performs all necessary initializations.
 */
async function boot () {
  // Enable some stuff during development to ease debugging
  if (process.env.NODE_ENV !== 'production') {
    // For dev tool support, attach to window...
    window.React = React;
  }
  // Create history
  const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
  // Create redux store
  const store = createStore(hashHistory, reducer);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(hashHistory, store, { selectLocationState: (state) => state.get('router') });
  // Initialize the app.
  await store.dispatch(doInit());
  // Render application
  ReactDOM.render(
    <Provider key='provider' store={store}>
      <Router history={ourHistory}>
        {getRoutes(store)}
      </Router>
    </Provider>,
    document.getElementById('root'));
}

boot();
