import React from 'react';
import { IndexRoute, IndexRedirect, Router, Route } from 'react-router';
import $ from 'jquery';
import { authenticationTokenSelector } from './selectors';

import App from './view/app';
import Carrefour from './view/carrefour';
import ChangePassword from './view/changePassword';
import ConfirmedNewsletter from './view/confirmedNewsletter';
import Error404 from './view/error404';
import HelloBankContestRules from './view/hellobank/contestRules';
import HelloBankHomeStep1 from './view/hellobank/home/step1';
import HelloBankHomeStep2 from './view/hellobank/home/step2';
import HelloBankHomeStep3 from './view/hellobank/home/step3';
import HellobankHomeWrapper from './view/hellobank/home';
import Home from './view/home';
import Login from './view/login';
import Medialaan from './view/medialaan';
import Privacy from './view/privacy';
import Profile from './view/profile';
import ProfileWishlist from './view/profile/wishlist';
import Redirect from './view/redirect';
import Terms from './view/terms';

/**
 * Utility.
 *
 * Every time the route changes, we check if we don't need to scroll down on
 * the current page.
 */
function updateScroll () {
  const { hash } = window.location;
  console.log(window.location);
  if (hash) {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const matches = /^\/(subscribe|content|get-in-touch)\?.*/.exec(hash);
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
export const getRoutes = (history, { getState }) => { // eslint-disable-line react/prop-types
  function requireAuth (nextState, replace) {
    // Not authenticated.. replace current location with /login
    if (!authenticationTokenSelector(getState())) {
      replace({
        pathname: '/login',
        state: { returnTo: nextState.location.pathname }
      });
    }
  }

  return (
    <Router history={history} onUpdate={updateScroll}>
      <Route component={App} path='/'>
        <IndexRoute component={Home} />
        <Route component={Home} path='/content' />
        <Route component={Home} path='/get-in-touch' />
        <Route component={Home} path='/subscribe' />
        <Route component={Redirect} path='/app' />
        <Route component={Privacy} path='/privacy' />
        <Route component={Terms} path='/terms' />

        <Route component={Login} path='/login' />
        <Route component={ChangePassword} path='/user/changepwd' />
        <Route component={ConfirmedNewsletter} path='/confirmed' />

        <Route component={Profile} path='/profile' onEnter={requireAuth} >
          <IndexRedirect to='/profile/wishlist' />
          <Route component={ProfileWishlist} path='/profile/wishlist'/>
        </Route>

        <Route>
          <Route component={HellobankHomeWrapper} path='/hellobank'>
            <IndexRoute component={HelloBankHomeStep1} key='helloBankHomeStep1' />
            <Route component={HelloBankHomeStep2} path='/hellobank/participate' />
            <Route component={HelloBankHomeStep3} path='/hellobank/confirmed' />
          </Route>
          <Route component={HelloBankContestRules} path='/hellobank-reglement' />
        </Route>
        <Route component={Medialaan} path='/medialaan' />
        <Route component={Carrefour} path='/carrefour' />,

        <Route component={Error404} path='*' />
      </Route>
    </Router>
  );
};
