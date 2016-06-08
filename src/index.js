import { createHashHistory } from 'history';
import { StyleRoot } from 'radium';
import React from 'react';
import { IndexRoute, Router, Route, useRouterHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import $ from 'jquery';
import { doInit } from './actions';
import createStore from './createStore';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import reducer from './reducer';

import Home from './view/home';
import ChangePassword from './view/changePassword';
import App from './view/app';
import ConfirmedNewsletter from './view/confirmedNewsletter';
import Error404 from './view/error404';
import Privacy from './view/privacy';
import Redirect from './view/redirect';
import Login from './view/login';
import Terms from './view/terms';
import HellobankHomeWrapper from './view/hellobank/home';
import HelloBankHomeStep1 from './view/hellobank/home/step1';
import HelloBankHomeStep2 from './view/hellobank/home/step2';
import HelloBankHomeStep3 from './view/hellobank/home/step3';
import HelloBankContestRules from './view/hellobank/contestRules';
import Carrefour from './view/carrefour';
import Medialaan from './view/medialaan';

/**
 * Utility.
 *
 * Every time the route changes, we check if we don't need to scroll down on
 * the current page.
 */
function hashLinkScroll () {
  const { hash } = window.location;
  if (hash) {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const matches = /^#\/(subscribe|content|get-in-touch)\?.*/.exec(hash);
      if (matches && matches.length > 1) {
        const id = matches[1];
        $('html, body').animate({
          scrollTop: $(`#${id}`).offset().top
        }, 850);
      }
    }, 0);
  }
}

/**
 * The application routes
 */
const getRoutes = ({ getState }) => { // eslint-disable-line react/prop-types
/*
  function requireAuth (nextState, replace) {
    const authData = getState();
    // Not authenticated.. replace current location with /login
    if (!authData.auth.isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  }
*/
  return (
    <Route component={App} path='/'>

      <IndexRoute component={Home} />
      <Route component={Home} path='/content' />
      <Route component={Home} path='/get-in-touch' />
      <Route component={Home} path='/subscribe' />
      <Route component={Redirect} path='/app' />
      <Route component={ConfirmedNewsletter} path='/confirmed' />
      <Route component={Privacy} path='/privacy' />
      <Route component={Terms} path='/terms' />

      <Route component={Login} path='/login' />
      <Route component={ChangePassword} path='/user/changepwd' />

      <Route>
        <Route component={HellobankHomeWrapper} path='/hellobank'>
          <IndexRoute component={HelloBankHomeStep1} key='helloBankHomeStep1' />
          <Route component={HelloBankHomeStep2} path='/hellobank/participate' />
          <Route component={HelloBankHomeStep3} path='/hellobank/confirmed' />
        </Route>
        <Route component={HelloBankContestRules} path='/hellobank-reglement' /> {/* Keep fixed, url is used externally! */}
      </Route>
      <Route component={Medialaan} path='/medialaan' />
      <Route component={Carrefour} path='/carrefour' />,

      <Route component={Error404} path='*' />
    </Route>
  );
};

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
  const createScrollHistory = useScroll(createHashHistory);
  const almostHistory = useRouterHistory(createScrollHistory)();
  // Create redux store
  const store = createStore(almostHistory, reducer);
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
    <Provider key='provider' store={store}>
      <StyleRoot>
        <Router history={ourHistory} onUpdate={hashLinkScroll}>
          {getRoutes(store)}
        </Router>
      </StyleRoot>
    </Provider>,
    document.getElementById('root'));
}

boot();
