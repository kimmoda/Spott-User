/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fromJS } from 'immutable';
import { AsyncRouterContext } from 'redux-async-props';
import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable';
// import { initBasketData } from './pages/basket/actions';

import { LOGIN_SUCCESS, DOWNLOAD_PAGE_SHOWED, doInit } from './pages/app/actions';
import { getRoutes } from './routes';
import app from './pages/app/reducer';
import data from './data/reducer';
import character from './pages/character/reducer';
import productDetail from './pages/productDetail/reducer';
import profile from './pages/profile/reducer';
import scene from './pages/scene/reducer';
import resetPassword from './pages/resetPassword/reducer';
import home from './pages/home/reducer';
import basket from './pages/basket/reducer';
import newHome from './pages/newHome/reducer';
// import { getLocalStorage, isServer } from './utils';
import { getLocalStorage } from './utils';

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  app,
  character,
  data,
  form,
  productDetail,
  profile,
  resetPassword,
  routing: routerReducer,
  scene,
  home,
  basket,
  newHome
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
    /*
    const createLogger = require('redux-logger');
    middleware.push(createLogger({
      // Collapse by default to preserve space in the console
      collapsed: true,
      // Convert Immutable state to plain JavaScript object, before logging.
      stateTransformer: (state) => state.toJS()
    }));
    */
  }
  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  if (__DEVELOPMENT__) {
    return newCreateStore(
      reducers,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return newCreateStore(
    reducers,
    initialState
  );
}

async function boot () {
  // Make sure theoplayer is accessible.
  /*
  if (!isServer()) {
    const a = document.createElement('script');
    const b = document.getElementsByTagName('script')[0];
    a.src = `${document.location.protocol}//cdn.theoplayer.com/latest/f9ae73eb-ac57-42ae-acdb-1ff18be7c597/theoplayer.loader.js`;
    a.type = 'text/javascript';
    b.parentNode.insertBefore(a, b);
  }
  */
  // Create redux store
  const initialState = fromJS({});
  const store = createOurStore(browserHistory, rootReducer, initialState);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(browserHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Clear state on start
  ourHistory.replace(ourHistory.createLocation({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null // Remove state
  }));
  // Initialize the app.
  await store.dispatch(doInit());
  // Load session from local storage.
  const storage = getLocalStorage();
  const session = storage.getItem('session');

  if (session) {
    try {
      const sessionData = JSON.parse(session);
      Reflect.deleteProperty(sessionData, 'initialValues');
      store.dispatch({ data: sessionData, type: LOGIN_SUCCESS });
    } catch (e) {
      console.log(e);
    }
    /*
    if (sessionData.ubAuthenticationToken) {
      store.dispatch(initBasketData());
    }
    */
  }
  const isDownloadPageShowed = storage.getItem('downloadPageShowed');
  if (isDownloadPageShowed) {
    store.dispatch({ downloadPageShowed: JSON.parse(isDownloadPageShowed), type: DOWNLOAD_PAGE_SHOWED });
  }

  // Render application
  ReactDOM.render(
    <StyleRoot>
      <Provider key='provider' store={store}>
        <Router history={ourHistory} render={(props) => <AsyncRouterContext {...props} asyncProps={initialState.get('asyncProps')} />}>
          {getRoutes(store)}
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('root'));
}

boot();
