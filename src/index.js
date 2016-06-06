import { createHashHistory } from 'history';
import { StyleRoot } from 'radium';
import React from 'react';
import { IndexRoute, Router, Route, useRouterHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { doInit } from './actions';
import createStore from './createStore';

import reducer from './reducer';

import App from './view/app';
import ConfirmedNewsletter from './view/confirmedNewsletter';
import Error404 from './view/error404';
import Privacy from './view/privacy';
import Redirect from './view/redirect';
import Terms from './view/terms';
import HellobankHomeWrapper from './view/hellobank/home';
import HelloBankHomeStep1 from './view/hellobank/home/step1';
import HelloBankHomeStep2 from './view/hellobank/home/step2';
import HelloBankHomeStep3 from './view/hellobank/home/step3';
import HelloBankContestRules from './view/hellobank/contestRules';
import Carrefour from './view/carrefour';
import Medialaan from './view/medialaan';

/**
 * The application routes
 */
const getRoutes = ({ getState }) => { // eslint-disable-line react/prop-types
  return (
    <Route component={App}>
      <Route component={Redirect} path='/app' />
      <Route component={ConfirmedNewsletter} path='/confirmed' />
      <Route component={Privacy} path='/privacy' />
      <Route component={Terms} path='/terms' />

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
  const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
  // Create redux store
  const store = createStore(hashHistory, reducer);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(hashHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Initialize the app.
  await store.dispatch(doInit());
  // Render application
  ReactDOM.render(
    <Provider key='provider' store={store}>
      <StyleRoot>
        <Router history={ourHistory}>
          {getRoutes(store)}
        </Router>
      </StyleRoot>
    </Provider>,
    document.getElementById('root'));
}

boot();
