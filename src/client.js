/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { doInit } from './pages/app/actions';
import { getRoutes } from './routes';
import { fromJS } from 'immutable';
import { AsyncRouterContext } from 'redux-async-props';
import { combineReducers } from 'redux-immutablejs';
import app from './pages/app/reducer';
import productDetail from './pages/productDetail/reducer';
import profile from './pages/profile/reducer';
import hellobank from './pages/hellobank/reducer';
import home from './pages/home/reducer';
import data from './data/reducer';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  app,
  data,
  home,
  hellobank,
  productDetail,
  profile,
  routing: routerReducer
});

/**
 * Creates a Redux store that holds the complete state tree of this app.
 * @param {object} theHistory The history used during redux store synchronization.
 * @param {function(state, action: object)} reducers A reducing function that returns the next state tree, given the current state tree and an action to handle.
 * @param {any} initialState
 * @return A redux store.
 */
export function createOurStore (theHistory, reducers, initialState) {
  const middleware = [];
  // Install thunk middleware
  middleware.push(thunkMiddleware);
  // Install react-router-redux's router middleware
  middleware.push(routerMiddleware(theHistory));
  // Install logging middleware when not in production
  if (__DEVELOPMENT__) {
    const createLogger = require('redux-logger');
    middleware.push(createLogger({
      // Collapse by default to preserve space in the console
      collapsed: true,
      // Convert Immutable state to plain JavaScript object, before logging.
      stateTransformer: (state) => state.toJS()
    }));
  }
  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  return newCreateStore(reducers, initialState);
}

async function boot () {
  // Create redux store
  const initialState = fromJS({});
  const store = createOurStore(browserHistory, rootReducer, initialState);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(browserHistory, store, { selectLocationState: (state) => state.get('routing') });
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
        <Router history={ourHistory} render={(props) => <AsyncRouterContext {...props} asyncProps={initialState.get('asyncProps')} />} onUpdate={() => window.scrollTo(0, 0)}>
          {getRoutes(store)}
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('root'));
}

boot();
