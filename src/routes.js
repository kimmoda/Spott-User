import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import App from './pages/app/view';
import Carrefour from './pages/microsites/carrefour/view';
import ChangePassword from './pages/changePassword';
import ConfirmedNewsletter from './pages/confirmedNewsletter';
import Error404 from './pages/error404';
import HelloBankContestRules from './pages/microsites/hellobank/view/contestRules';
import HelloBankHomeStep1 from './pages/microsites/hellobank/view/home/step1';
import HelloBankHomeStep2 from './pages/microsites/hellobank/view/home/step2';
import HelloBankHomeStep3 from './pages/microsites/hellobank/view/home/step3';
import HellobankHomeWrapper from './pages/microsites/hellobank/view/home';
import Home from './pages/home/view';
import Login from './pages/login';
import Medialaan from './pages/microsites/medialaan';
import Privacy from './pages/privacy';
import ProductDetail from './pages/productDetail/view';
import Profile from './pages/profile/view';
import ProfileWishlistProducts from './pages/profile/view/wishlistProducts';
import ProfileWishlists from './pages/profile/view/wishlists';
import Redirect from './pages/redirect';
// import Series from './pages/series/view';
// import SeriesOverview from './pages/series/view/overview';
// import SeriesProducts from './pages/series/view/products';
// import SeriesScenes from './pages/series/view/scenes';
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
      <Route component={Home} path='/' />
      <Route component={Redirect} noNavigation path='/app'/>
      <Route component={Privacy} path='/privacy' />
      <Route component={Terms} path='/terms' />
      {/*
      <Route component={Series} path='/series/:seriesId'>
        <IndexRedirect to='/series/:seriesId/overview' />
        <Route component={SeriesOverview} path='/series/:seriesId/overview' />
        <Route component={SeriesProducts} path='/series/:seriesId/products' />
        <Route component={SeriesScenes} path='/series/:seriesId/season/:seasonId'>
          <Route component={SeriesScenes} path='/series/:seriesId/season/:seasonId/episode/:episodeId/scenes' />
        </Route>
      </Route>
      */}

      <Route component={ProductDetail} path='/product/:productSlug/:productId' />

      <Route component={Login} path='/login' />
      <Route component={ChangePassword} noNavigation path='/user/changepwd'/>
      <Route component={ConfirmedNewsletter} path='/confirmed' />

      <Route component={Profile} floating path='/profile/:userSlug/:userId' >
        <IndexRedirect to='/profile/:userSlug/:userId/wishlists' />
        <Route path='/profile/:userSlug/:userId/wishlists'>
          <IndexRoute component={ProfileWishlists} />
          <Route component={ProfileWishlistProducts} path='/profile/:userSlug/:userId/wishlists/:wishlistSlug/:wishlistId' />
        </Route>
      </Route>

      <Route>
        <Route component={HellobankHomeWrapper} path='/hellobank' standalone>
          <IndexRoute component={HelloBankHomeStep1} key='helloBankHomeStep1' />
          <Route component={HelloBankHomeStep2} path='/hellobank/participate' />
          <Route component={HelloBankHomeStep3} path='/hellobank/confirmed' />
        </Route>
        <Route component={HelloBankContestRules} path='/hellobank-reglement' />
      </Route>
      <Route component={Medialaan} path='/medialaan' standalone />
      <Route component={Carrefour} path='/carrefour' standalone />,

      <Route component={Error404} path='*' />
    </Route>
  );
};
