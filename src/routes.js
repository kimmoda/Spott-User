import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import App from './pages/app/view';
import ChangePassword from './pages/changePassword';
import Error404 from './pages/error404';
import Home from './pages/home/view';
import Login from './pages/login';
import Register from './pages/register/view';
import Privacy from './pages/privacy';
import ProductDetail from './pages/productDetail/view';
import Profile from './pages/profile/view';
import ProfileWishlistProducts from './pages/profile/view/wishlistProducts';
import ProfileWishlists from './pages/profile/view/wishlists';
import ProfileSavedScenes from './pages/profile/view/savedScenes';
import Redirect from './pages/redirect';
import Medium from './pages/medium/view';
import MediumOverview from './pages/medium/view/overview';
import MediumSeasons from './pages/medium/view/seasons';
import MediumEpisodes from './pages/medium/view/episodes';
import MediumScenes from './pages/medium/view/scenes';
import MediumTabs from './pages/medium/view/tabs';
// import SeriesProducts from './pages/series/view/products';
// import SeriesScenes from './pages/series/view/scenes';
import Terms from './pages/terms';
import { changeLocale } from './pages/app/actions';
import { MOVIE, SERIES } from './data/mediumTypes';
import { locales } from './locales';

/**
 * The application routes
 */
export const getRoutes = ({ dispatch, getState }) => { // eslint-disable-line react/prop-types
  /* TODO: not used yet
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

  function onRootEnter (state, replace) {
    const { location } = state;
    // Hash url for terms and privacy will be replaced by a url without a hash!
    // The language is also set to 'en'.
    if (location.pathname === '' || location.pathname === '/') {
      if (location.hash === '#terms' || location.hash === '#/terms' || location.hash === '#/terms/') {
        return replace('/en/terms');
      }
      if (location.hash === '#privacy' || location.hash === '#/privacy' || location.hash === '#/privacy/') {
        return replace('/en/privacy');
      }
    }
    // Replace full regionalized locales by simple ones.
    if (/^\/[a-z]{2}\-[a-zA-Z]{2}($|\/)/.test(location.pathname)) {
      location.pathname = location.pathname.substring(0, 3) + location.pathname.substring(6); // Cut away region
      return replace(location);
    }
  }

  // Factory for localized routes
  function makeLocalizedRoutes (locale) {
    // When entering a page, the locale is dispatched.
    function onLocaleEnter (state) {
      dispatch(changeLocale(locale));
    }

    return (
      <Route key={locale} path={locale} onEnter={onLocaleEnter}>
        <IndexRoute component={Home} />

        <Route component={Redirect} noSignInButtonInHeader path='app'/>
        <Route component={Privacy} path='privacy' />
        <Route component={Terms} path='terms' />

        <Route component={Medium} mediumType={SERIES} path={'series/:mediumSlug/:mediumId'}>
          <IndexRedirect to='overview' />
          <Route components={{ main: MediumOverview, nav: MediumTabs }} path='overview' />
          <Route components={{ main: MediumScenes, nav: MediumTabs }}>
            <Route component={MediumSeasons} path='season'>
              <Route component={MediumEpisodes} path=':seasonSlug/:seasonId'>
                <Route component={null} path='episode/:episodeSlug/:episodeId' />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route component={Medium} mediumType={MOVIE} path={'movie/:mediumSlug/:mediumId'}>
          <IndexRedirect to='overview' />
          <Route components={{ main: MediumOverview, nav: MediumTabs }} path='overview' />
          <Route components={{ main: MediumScenes, nav: MediumTabs }} path='scenes' />
        </Route>

        <Route component={ProductDetail} path='product/:productSlug/:brandSlug/:productId' />
        <Route component={ProductDetail} path='product/:productSlug/:productId' /> {/* Backwards compatible with old url. */}

        <Route component={Login} noSignInButtonInHeader path='login' />
        <Route component={Register} noSignInButtonInHeader path='register' />
        <Route component={ChangePassword} noSignInButtonInHeader path='user/changepwd'/>

        <Route component={Profile} floating path='profile/:userSlug/:userId' >
          <IndexRedirect to='saved-scenes' />
          <Route path='wishlists'>
            <IndexRoute component={ProfileWishlists} />
            <Route component={ProfileWishlistProducts} path=':wishlistSlug/:wishlistId' />
          </Route>
          <Route component={ProfileSavedScenes} path='saved-scenes' />
        </Route>
      </Route>
    );
  }

  return (
    <Route component={App} path='/' onEnter={onRootEnter}>
      <IndexRedirect to='/en' />
      {locales.map((locale) => makeLocalizedRoutes(locale))}

      <Route component={Error404} path='*' />
    </Route>
  );
};
