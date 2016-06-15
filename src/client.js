/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { useRouterHistory, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { doInit } from './actions';
import createStore from './createStore';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { getRoutes } from './routes';
import reducer from './reducer';
import { fromJS } from 'immutable';

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

async function boot () {
  // Create history
  const createScrollHistory = useScroll(() => browserHistory);
  const almostHistory = createScrollHistory();
  // Create redux store
  const store = createStore(almostHistory, reducer, fromJS(window.__INITIAL_STATE__));
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(almostHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Initialize the app.
  await store.dispatch(doInit());
  // Load session from local storage.
  if (localStorage) {
    const session = localStorage.getItem('session');
    if (session) {
      store.dispatch({ data: JSON.parse(session), type: 'LOGIN_SUCCESS' });
    }
  }
  // Render application
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        {getRoutes(ourHistory, store)}
      </StyleRoot>
    </Provider>,
    document.getElementById('root'));
}

boot();
