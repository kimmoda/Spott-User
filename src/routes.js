import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import { isIos, isAndroid } from './pages/_common/downloadAppButtons';
import App from './pages/app/view';
import ChangePassword from './pages/changePassword';
import Cookies from './pages/cookies';
import Error404 from './pages/error404';
import Mobile from './pages/mobile';
import Privacy from './pages/privacy';
import Redirect from './pages/redirect';
import ResetPassword from './pages/resetPassword';
import ResetPasswordSuccess from './pages/resetPassword/success';
// import SeriesProducts from './pages/series/view/products';
// import SeriesScenes from './pages/series/view/scenes';
import Terms from './pages/terms';
import { changeLocale, downloadPageShowed } from './pages/app/actions';
import { locales } from './locales';
import { currentLocaleSelector, isDownloadPageShowedSelector, isUbAuthenticatedSelector } from './pages/app/selector';
import { updateLocale as updateUbLocale } from './pages/basket/actions';
import NewHome from './pages/newHome/view/homePage';
import NewTopic from './pages/newHome/view/topicPage';
import NewLogin from './pages/newHome/view/login';
import NewRegistration from './pages/newHome/view/registration';
import NewUserSettingsPage from './pages/newHome/view/settingsPage/view';
import NewUserSettings from './pages/newHome/view/settingsPage/view/settings';
import NewUserAccount from './pages/newHome/view/settingsPage/view/account';
import NewUserSubscriptions from './pages/newHome/view/settingsPage/view/susbcriptions';

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

    return (
      <Route key={locale} path={locale} onEnter={onLocaleEnter}>
        <Route component={Redirect} noSignInButtonInHeader path='app' showCookies={false} />
        <Route component={Privacy} path='privacy' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Terms} path='terms' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />
        <Route component={Cookies} path='cookies' showCookies={false} onEnter={() => window.scrollTo(0, 0)} />

        <Route component={Mobile} path='mobile/download' standalone/>
        <Route component={ResetPassword} noSignInButtonInHeader path='resetpassword'/>
        <Route component={ResetPasswordSuccess} noSignInButtonInHeader path='resetpassword/success'/>
        <Route component={ChangePassword} noSignInButtonInHeader path='user/changepwd'/>

        <IndexRoute component={NewHome} newDesign onEnter={goToDownloadPage}/>
        <Route component={NewTopic} newDesign path='topic/:topicId'/>
        <Route component={NewLogin} newDesign path='login'/>
        <Route component={NewRegistration} newDesign path='registration'/>
        <Route component={NewUserSettingsPage} newDesign path='user'>
          <IndexRedirect to='profile'/>
          <Route component={NewUserSettings} newDesign path='settings'/>
          <Route component={NewUserAccount} newDesign path='account'/>
          <Route component={NewUserSubscriptions} newDesign path='subscriptions'/>
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
