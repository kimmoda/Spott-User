import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import App from './pages/app/view';
import Carrefour from './pages/carrefour/view';
import ChangePassword from './pages/changePassword';
import ConfirmedNewsletter from './pages/confirmedNewsletter';
import Error404 from './pages/error404';
import HelloBankContestRules from './pages/hellobank/view/contestRules';
import HelloBankHomeStep1 from './pages/hellobank/view/home/step1';
import HelloBankHomeStep2 from './pages/hellobank/view/home/step2';
import HelloBankHomeStep3 from './pages/hellobank/view/home/step3';
import HellobankHomeWrapper from './pages/hellobank/view/home';
import Home from './pages/home';
import Login from './pages/login';
import Medialaan from './pages/medialaan';
import Privacy from './pages/privacy';
import ProductDetail from './pages/productDetail/view';
import Profile from './pages/profile/view';
import ProfileWishlists from './pages/profile/view/wishlists';
import ProfileWishlistProducts from './pages/profile/view/wishlistProducts';
import Redirect from './pages/redirect';
import Terms from './pages/terms';

/**
 * The application routes
 */
export const getRoutes = ({ getState }) => { // eslint-disable-line react/prop-types
/*
  function requireAuth (nextState, replace) {
    // Not authenticated.. replace current location with /login
    if (!authenticationTokenSelector(getState())) {
      replace({
        pathname: '/login',
        state: { returnTo: nextState.location.pathname }
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
      <Route component={Privacy} path='/privacy' />
      <Route component={Terms} path='/terms' />

      <Route component={ProductDetail} path='/product/:productId' />

      <Route component={Login} path='/login' />
      <Route component={ChangePassword} path='/user/changepwd' />
      <Route component={ConfirmedNewsletter} path='/confirmed' />

      <Route component={Profile} path='/profile/:userSlug/:userId' >
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
