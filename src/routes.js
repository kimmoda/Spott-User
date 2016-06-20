import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
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
import Profile from './view/profile/view';
import ProfileWishlists from './view/profile/view/wishlists';
import ProfileWishlistProducts from './view/profile/view/wishlistProducts';
import Redirect from './view/redirect';
import Terms from './view/terms';

/**
 * The application routes
 */
export const getRoutes = ({ getState }) => { // eslint-disable-line react/prop-types
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

      <Route component={Profile} path='/profile/:userSlug/:userId' onEnter={requireAuth} >
        <IndexRedirect to='/profile/:userSlug/:userId/wishlists' />
        <Route path='/profile/:userSlug/:userId/wishlists'>
          <IndexRoute component={ProfileWishlists} />
          <Route component={ProfileWishlistProducts} path='/profile/:userSlug/:userId/wishlists/:wishlistSlug/:wishlistId' />
        </Route>
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
  );
};
