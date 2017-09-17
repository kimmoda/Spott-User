import React from 'react';
import { IndexRoute, IndexRedirect, Route, Redirect as RouterRedirect } from 'react-router';
// import { isIos, isAndroid } from './pages/_common/downloadAppButtons';
import App from './pages/app/view';
import ChangePassword from './pages/changePassword';
import Cookies from './pages/legal/view/cookies';
import Error404 from './pages/error404';
import Mobile from './pages/mobile';
import Privacy from './pages/legal/view/privacy';
import Redirect from './pages/redirect';
import Terms from './pages/legal/view/terms';
// import { changeLocale, downloadPageShowed } from './pages/app/actions';
import { changeLocale } from './pages/app/actions';
import { locales } from './locales';
// import { currentLocaleSelector, isDownloadPageShowedSelector } from './pages/app/selector';
import { trackTopicView } from './pages/actions';
import NewHome from './pages/homePage';
import Topic from './pages/topicPage';
import TopicSpotts from './pages/topicPage/topicSpotts';
import SeasonSpotts from './pages/topicPage/seasonSpotts';
import EpisodeSpotts from './pages/topicPage/episodeSpotts';
import NewLogin from './pages/login';
import NewRegistration from './pages/registration';
import NewUserSettingsPage from './pages/settingsPage/view';
import NewUserSettings from './pages/settingsPage/view/settings';
import NewUserAccount from './pages/settingsPage/view/account';
import NewUserSubscriptions from './pages/settingsPage/view/susbcriptions';
import NewUserProfilePage from './pages/profilePage/view';
import NewUserLoves from './pages/profilePage/view/loves';
import NewUserWishlist from './pages/profilePage/view/wishlist';
import SearchResults from './pages/searchResultsPage/view';
import SearchResultsPosts from './pages/searchResultsPage/view/posts';
import SearchResultsPeople from './pages/searchResultsPage/view/people';
import NewResetPassword from './pages/resetPassword';
import SpottDetailsContainer from './pages/spottDetailsContainer';
import ProductModal from './pages/productModal';
import PromoPage from './pages/promoPage';

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
    /*
    function goToDownloadPage (state, replace) {
      const isDownloadPageShowed = isDownloadPageShowedSelector(getState());
      if ((isAndroid() || isIos()) && (!isDownloadPageShowed)) {
        dispatch(downloadPageShowed());
        const lang = currentLocaleSelector(getState());
        replace({ pathname: `${lang}/mobile/download`, state: { returnTo: state.location.pathname } });
      }
    }
    */

    // When entering a page, the locale is dispatched.
    function onLocaleEnter (state, replace) {
      dispatch(changeLocale(locale));
    }

    return (
      <Route key={locale} path={locale} onEnter={onLocaleEnter}>
        <Route component={Redirect} noSignInButtonInHeader path='app' showCookies={false} />
        <Route component={Privacy} path='privacy' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Terms} path='terms' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Cookies} path='cookies' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />

        <Route component={Mobile} path='mobile/download' standalone/>

        <Route component={PromoPage} path='douweegberts' standalone/>

        <RouterRedirect from='live/*' to='/'/>
        <RouterRedirect from='home/*' to='/'/>
        <RouterRedirect from='activityfeed/*' to='/'/>
        <RouterRedirect from='profile' to='/'/>

        <IndexRoute component={NewHome} />
        <Route
          component={Topic}
          newDesign
          path='topic/:topicTitle/:topicId'
          onEnter={({ params: { topicId }, location }) => {
            const dc = location.state && location.state.dc || '';
            topicId && dispatch(trackTopicView({ uuid: topicId, dc }));
          }}>
          <IndexRoute component={TopicSpotts} newDesign/>
          <Route component={SeasonSpotts} path='season/:seasonSlug/:seasonId'/>
          <Route component={EpisodeSpotts} path='season/:seasonSlug/:seasonId/episode/:episodeSlug/:episodeId'/>
        </Route>
        <Route component={NewLogin} path='login'/>
        <Route component={NewRegistration} path='registration'/>
        <Route component={NewResetPassword} path='resetpassword'/>
        <Route component={ChangePassword} path='user/changepwd'/>
        <Route component={SpottDetailsContainer} modalPage path='modal/spott/:spottTitle/:spottId'/>
        <Route component={SpottDetailsContainer} modalPage path='modal/spott/:spottTitle/:productTitle/%7B:spottId%7D%7B:productId%7D'/>
        <Route component={SpottDetailsContainer} modalPage path='modal/spott/:spottTitle/:productTitle/{:spottId}{:productId}'/>
        <Route component={SpottDetailsContainer} path='spott/:spottTitle/:spottId'/>
        <Route component={SpottDetailsContainer} path='spott/:spottTitle/:productTitle/%7B:spottId%7D%7B:productId%7D'/>
        <Route component={SpottDetailsContainer} path='spott/:spottTitle/:productTitle/{:spottId}{:productId}'/>
        <Route component={ProductModal} modalPage path='product/:productTitle/:brandTitle/:productId'/>
        <Route component={SearchResults} path='search'>
          <IndexRedirect to='posts'/>
          <Route component={SearchResultsPosts} path='posts'/>
          <Route component={SearchResultsPeople} path='people'/>
        </Route>
        <Route component={NewUserSettingsPage} path='user'>
          <IndexRedirect to='settings'/>
          <Route component={NewUserSettings} path='settings'/>
          <Route component={NewUserAccount} path='account'/>
          <Route component={NewUserSubscriptions} path='subscriptions'/>
        </Route>
        <Route component={NewUserProfilePage} path='profile/:userId'>
          <IndexRedirect to='loves'/>
          <Route component={NewUserLoves} path='loves'/>
          <Route component={NewUserWishlist} path='wishlist'/>
        </Route>
      </Route>
    );
  }

  return (
    <Route component={App} path='/' onEnter={onRootEnter}>
      <IndexRedirect to={`/${getBrowserLanguage()}`} />
      {locales.map((locale) => makeLocalizedRoutes(locale))}
      <RouterRedirect from='live/*' to='/'/>
      <RouterRedirect from='home/*' to='/'/>
      <RouterRedirect from='activityfeed/*' to='/'/>
      <RouterRedirect from='profile' to='/'/>
      <Route component={Error404} path='*' showCookies={false} />
    </Route>
  );
};
