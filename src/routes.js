import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import { colors, SmallContainer } from './pages/_common/buildingBlocks';
import { isIos, isAndroid } from './pages/_common/downloadAppButtons';
import App from './pages/app/view';
import ChangePassword from './pages/changePassword';
import Cookies from './pages/cookies';
import Character from './pages/character/view';
import CharacterProducts from './pages/character/view/products';
import Error404 from './pages/error404';
import Home from './pages/home/view';
import Login from './pages/login';
import Mobile from './pages/mobile';
import Register from './pages/register/view';
import Privacy from './pages/privacy';
import ProductDetail from './pages/productDetail/view';
import Profile from './pages/profile/view';
import ProfileWishlistProducts from './pages/profile/view/wishlistProducts';
import ProfileWishlists from './pages/profile/view/wishlists';
import ProfileSavedScenes from './pages/profile/view/savedScenes';
import Redirect from './pages/redirect';
import Scene from './pages/scene/view';
import SceneProduct from './pages/scene/view/productDetail';
import Medium from './pages/medium/view';
import MediumOverview from './pages/medium/view/overview';
import MediumProducts from './pages/medium/view/products';
import MediumSeasons from './pages/medium/view/seasons';
import MediumEpisodes from './pages/medium/view/episodes';
import MediumScenes from './pages/medium/view/scenes';
import MediumTabs from './pages/medium/view/tabs';
import ResetPassword from './pages/resetPassword';
import ResetPasswordSuccess from './pages/resetPassword/success';
import Basket from './pages/basket/view';
import Orders from './pages/basket/view/orders';
import OrderDetails from './pages/basket/view/orderDetails';
// import SeriesProducts from './pages/series/view/products';
// import SeriesScenes from './pages/series/view/scenes';
import Terms from './pages/terms';
import { characterView, mediumView, productView, sceneView, userView } from './data/actions';
import { changeLocale, downloadPageShowed } from './pages/app/actions';
import { COMMERCIAL, MOVIE, SERIES } from './data/mediumTypes';
import { locales } from './locales';
import { currentLocaleSelector, isDownloadPageShowedSelector, isUbAuthenticatedSelector } from './pages/app/selector';
import { updateLocale as updateUbLocale } from './pages/basket/actions';

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

  function getBrowserLanguage () {
    // Detect language, fall back to 'en'
    let detectedLanguage =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage ||
      'en';
    // Remove region of detected locale
    if (/^[a-z]{2}\-[a-zA-Z]{2}$/.test(detectedLanguage)) {
      detectedLanguage = detectedLanguage.substring(0, 2).toLowerCase();
    }
    // Ensure that we know the detected language, otherwise fall back to 'en'.
    if (locales.includes(detectedLanguage)) {
      return detectedLanguage;
    }
    return 'en';
  }

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
    function goToDownloadPage (state, replace) {
      const isDownloadPageShowed = isDownloadPageShowedSelector(getState());
      if ((isAndroid() || isIos()) && (!isDownloadPageShowed)) {
        dispatch(downloadPageShowed());
        const lang = currentLocaleSelector(getState());
        replace({ pathname: `${lang}/mobile/download`, state: { returnTo: state.location.pathname } });
      }
    }

    // When entering a page, the locale is dispatched.
    function onLocaleEnter (state, replace) {
      const isUbAuthenticated = isUbAuthenticatedSelector(getState());
      if (isUbAuthenticated) {
        dispatch(updateUbLocale(locale));
      }
      dispatch(changeLocale(locale));
    }

    const placeholderStyle = {
      width: '100%',
      paddingTop: '7.5em',
      paddingBottom: '7.5em',
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
      backgroundColor: colors.whiteGray
    };

    return (
      <Route key={locale} path={locale} onEnter={onLocaleEnter}>
        <IndexRoute component={Home} onEnter={goToDownloadPage}/>

        <Route component={Redirect} noSignInButtonInHeader path='app' showCookies={false} />
        <Route component={Privacy} path='privacy' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Terms} path='terms' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Cookies} path='cookies' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />

        <Route component={Character} path='character/:characterSlug/:characterId' onEnter={({ params: { characterId } }) => {
          characterId && dispatch(characterView({ characterId }));
        }}>
          <IndexRedirect to='products' />
          <Route component={CharacterProducts} path='products' />
        </Route>

        {/* Scenes */}
        <Route component={Scene} path='series/:seriesSlug/:seriesId/season/:seasonSlug/:seasonId/episode/:episodeSlug/:episodeId/scenes/scene/:sceneId' onEnter={({ params: { sceneId } }) => {
          sceneId && dispatch(sceneView({ sceneId }));
        }}>
          <IndexRoute component={() => <div style={placeholderStyle}><SmallContainer /></div>} />
          <Route component={SceneProduct} path='product/:productId' />
        </Route>

        <Route component={Scene} path='commercial/:commercialSlug/:commercialId/scenes/scene/:sceneId' onEnter={({ params: { sceneId } }) => {
          sceneId && dispatch(sceneView({ sceneId }));
        }}>
          <IndexRoute component={() => <div style={placeholderStyle}><SmallContainer /></div>} />
          <Route component={SceneProduct} path='product/:productId' />
        </Route>

        <Route component={Scene} path='movie/:movieSlug/:movieId/scenes/scene/:sceneId' onEnter={({ params: { sceneId } }) => {
          sceneId && dispatch(sceneView({ sceneId }));
        }}>
          <IndexRoute component={() => <div style={placeholderStyle}><SmallContainer /></div>} />
          <Route component={SceneProduct} path='product/:productId' />
        </Route>

        {/* Media */}
        <Route component={Medium} mediumType={COMMERCIAL} path='commercial/:mediumSlug/:mediumId' onEnter={({ params: { mediumId } }) => {
          window.scrollTo(0, 0);
          mediumId && dispatch(mediumView({ mediumId }));
        }}>
          <IndexRedirect to='overview' />
          <Route components={{ main: MediumOverview, nav: MediumTabs }} path='overview' />
          <Route components={{ main: MediumProducts, nav: MediumTabs }} path='products' />
          <Route components={{ main: MediumScenes, nav: MediumTabs }} mediumType={COMMERCIAL} path='scenes' />
        </Route>
        <Route component={Medium} mediumType={SERIES} path='series/:mediumSlug/:mediumId' onEnter={({ params: { mediumId } }) => {
          window.scrollTo(0, 0);
          mediumId && dispatch(mediumView({ mediumId }));
        }}>
          <IndexRedirect to='overview' />
          <Route components={{ main: MediumOverview, nav: MediumTabs }} path='overview' />
          <Route components={{ main: MediumProducts, nav: MediumTabs }} path='products' />
          <Route components={{ main: MediumScenes, nav: MediumTabs }} mediumType={SERIES}>
            <Route component={MediumSeasons} path='season'>
              <Route component={MediumEpisodes} path=':seasonSlug/:seasonId' onEnter={({ params: { seasonId } }) => {
                seasonId && dispatch(mediumView({ mediumId: seasonId }));
              }}>
                <Route component={null} path='episode/:episodeSlug/:episodeId' onEnter={({ params: { episodeId } }) => {
                  episodeId && dispatch(mediumView({ mediumId: episodeId }));
                }}/>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route component={Medium} mediumType={MOVIE} path={'movie/:mediumSlug/:mediumId'} onEnter={({ params: { mediumId } }) => {
          window.scrollTo(0, 0);
          mediumId && dispatch(mediumView({ mediumId }));
        }}>
          <IndexRedirect to='overview' />
          <Route components={{ main: MediumOverview, nav: MediumTabs }} path='overview' />
          <Route components={{ main: MediumProducts, nav: MediumTabs }} path='products' />
          <Route components={{ main: MediumScenes, nav: MediumTabs }} mediumType={MOVIE} path='scenes' />
        </Route>

        <Route component={ProductDetail} path='product/:productSlug/:brandSlug/:productId' onEnter={({ params: { productId } }) => {
          productId && dispatch(productView({ productId }));
        }} />
        <Route component={ProductDetail} path='product/:productSlug/:productId' onEnter={({ params: { productId } }) => {
          productId && dispatch(productView({ productId }));
        }} /> {/* Backwards compatible with old url. */}

        <Route component={Mobile} path='mobile/download' standalone/>
        <Route component={Login} noSignInButtonInHeader path='login' />
        <Route component={Register} noSignInButtonInHeader path='register' />
        <Route component={ResetPassword} noSignInButtonInHeader path='resetpassword'/>
        <Route component={ResetPasswordSuccess} noSignInButtonInHeader path='resetpassword/success'/>
        <Route component={ChangePassword} noSignInButtonInHeader path='user/changepwd'/>

        <Route component={Profile} floating path='profile/:userSlug/:userId' onEnter={({ params: { userId } }) => {
          userId && dispatch(userView({ userId }));
        }}>
          <IndexRedirect to='saved-scenes' />
          <Route path='wishlists'>
            <IndexRoute component={ProfileWishlists} />
            <Route component={ProfileWishlistProducts} path=':wishlistSlug/:wishlistId' />
          </Route>
          <Route component={ProfileSavedScenes} path='saved-scenes' />
        </Route>

        <Route component={Basket} path='basket' />

        <Route component={Orders} path='orders' />

        <Route component={OrderDetails} path='orders/:orderId' />

      </Route>
    );
  }

  return (
    <Route component={App} path='/' onEnter={onRootEnter}>
      <IndexRedirect to={`/${getBrowserLanguage()}`} />
      {locales.map((locale) => makeLocalizedRoutes(locale))}

      <Route component={Error404} path='*' showCookies={false} />
    </Route>
  );
};
