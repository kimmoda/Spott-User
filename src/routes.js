import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import { isIos, isAndroid } from './pages/_common/downloadAppButtons';
import App from './pages/app/view';
import ChangePassword from './pages/changePassword';
// import Cookies from './pages/cookies';
import Cookies from './pages/newHome/view/legal/view/cookies';
import Error404 from './pages/error404';
import Mobile from './pages/mobile';
// import Privacy from './pages/privacy';
import Privacy from './pages/newHome/view/legal/view/privacy';
import Redirect from './pages/redirect';
// import ResetPassword from './pages/resetPassword';
// import ResetPasswordSuccess from './pages/resetPassword/success';
// import SeriesProducts from './pages/series/view/products';
// import SeriesScenes from './pages/series/view/scenes';
// import Terms from './pages/terms';
import Terms from './pages/newHome/view/legal/view/terms';
import { changeLocale, downloadPageShowed } from './pages/app/actions';
import { locales } from './locales';
import { currentLocaleSelector, isDownloadPageShowedSelector } from './pages/app/selector';
// import { updateLocale as updateUbLocale } from './pages/basket/actions';
import { trackTopicView } from './pages/newHome/actions';
import NewHome from './pages/newHome/view/homePage';
import Topic from './pages/newHome/view/topicPage';
import TopicSpotts from './pages/newHome/view/topicPage/topicSpotts';
import SeasonSpotts from './pages/newHome/view/topicPage/seasonSpotts';
import EpisodeSpotts from './pages/newHome/view/topicPage/episodeSpotts';
import NewLogin from './pages/newHome/view/login';
import NewRegistration from './pages/newHome/view/registration';
import NewUserSettingsPage from './pages/newHome/view/settingsPage/view';
import NewUserSettings from './pages/newHome/view/settingsPage/view/settings';
import NewUserAccount from './pages/newHome/view/settingsPage/view/account';
import NewUserSubscriptions from './pages/newHome/view/settingsPage/view/susbcriptions';
import NewUserProfilePage from './pages/newHome/view/profilePage/view';
import NewUserLoves from './pages/newHome/view/profilePage/view/loves';
import NewUserWishlist from './pages/newHome/view/profilePage/view/wishlist';
import SearchResults from './pages/newHome/view/searchResultsPage/view';
import SearchResultsPosts from './pages/newHome/view/searchResultsPage/view/posts';
import SearchResultsPeople from './pages/newHome/view/searchResultsPage/view/people';
import NewResetPassword from './pages/newHome/view/resetPassword';
import CardModal from './pages/newHome/view/cardModal';

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
      /* const isUbAuthenticated = isUbAuthenticatedSelector(getState());
      if (isUbAuthenticated) {
        dispatch(updateUbLocale(locale));
      }
      */
      dispatch(changeLocale(locale));
    }

    return (
      <Route key={locale} path={locale} onEnter={onLocaleEnter}>
        <Route component={Redirect} noSignInButtonInHeader path='app' showCookies={false} />
        <Route component={Privacy} newDesign path='privacy' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Terms} newDesign path='terms' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Cookies} newDesign path='cookies' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />

        <Route component={Mobile} path='mobile/download' standalone/>

        <IndexRoute component={NewHome} newDesign />
        <Route
          component={Topic}
          newDesign
          path='topic/:topicTitle/:topicId'
          onEnter={({ params: { topicId }, location }) => {
            const dc = location.state && location.state.dc || '';
            topicId && dispatch(trackTopicView({ uuid: topicId, dc }));
          }}>
          <IndexRoute component={TopicSpotts} newDesign/>
          <Route component={SeasonSpotts} newDesign path='season/:seasonSlug/:seasonId'/>
          <Route component={EpisodeSpotts} newDesign path='season/:seasonSlug/:seasonId/episode/:episodeSlug/:episodeId'/>
        </Route>
        <Route component={NewLogin} newDesign path='login'/>
        <Route component={NewRegistration} newDesign path='registration'/>
        <Route component={NewResetPassword} newDesign path='resetpassword'/>
        <Route component={ChangePassword} newDesign path='user/changepwd'/>
        <Route component={CardModal} modalPage newDesign path='spott/:spottTitle/:spottId'/>
        <Route component={CardModal} modalPage newDesign path='spott/:spottTitle/:productTitle/%7B:spottId%7D%7B:productId%7D'/>
        <Route component={CardModal} modalPage newDesign path='spott/:spottTitle/:productTitle/{:spottId}{:productId}'/>
        <Route component={SearchResults} newDesign path='search'>
          <IndexRedirect to='posts'/>
          <Route component={SearchResultsPosts} newDesign path='posts'/>
          <Route component={SearchResultsPeople} newDesign path='people'/>
        </Route>
        <Route component={NewUserSettingsPage} newDesign path='user'>
          <IndexRedirect to='settings'/>
          <Route component={NewUserSettings} newDesign path='settings'/>
          <Route component={NewUserAccount} newDesign path='account'/>
          <Route component={NewUserSubscriptions} newDesign path='subscriptions'/>
        </Route>
        <Route component={NewUserProfilePage} newDesign path='profile/:userId'>
          <IndexRedirect to='loves'/>
          <Route component={NewUserLoves} newDesign path='loves'/>
          <Route component={NewUserWishlist} newDesign path='wishlist'/>
        </Route>
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
