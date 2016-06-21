/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import { doInit } from './pages/app/actions';
import createStore from './createStore';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { getRoutes } from './routes';
import { fromJS } from 'immutable';
import { AsyncRouterContext } from 'redux-async-props';
import { combineReducers } from 'redux-immutablejs';
import app from './pages/app/reducer';
import profile from './pages/profile/reducer';
import hellobank from './pages/hellobank/reducer';

const $ = require('jquery');

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

/**
 * Utility.
 *
 * Every time the route changes, we check if we don't need to scroll down on
 * the current page.
 */
function updateScroll () {
  const url = window.location.pathname;
  console.log(url);
  if (url) {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const matches = /^\/(subscribe|content|get-in-touch).*/.exec(url);
      if (matches && matches.length > 1) {
        const id = matches[1];
        $('html, body').animate({
          scrollTop: $(`#${id}`).offset().top
        }, 850);
      }
    }, 0);
  }
}

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  app,
  hellobank,
  profile,
  routing: routerReducer
});

async function boot () {
  // Create history
  const createScrollHistory = useScroll(() => browserHistory);
  const almostHistory = createScrollHistory();
  // Create redux store
  const initialState = fromJS({});
  const store = createStore(almostHistory, rootReducer, initialState);
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
    <StyleRoot>
      <Provider key='provider' store={store}>
        <Router history={ourHistory} render={(props) => <AsyncRouterContext {...props} asyncProps={initialState.get('asyncProps')} />} onUpdate={updateScroll}>
          {getRoutes(store)}
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('root'));
}

boot();
