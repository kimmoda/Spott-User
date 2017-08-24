/**
 * The client's entry point.
 */
import { StyleRoot } from 'radium';
import React from 'react';
import { browserHistory, Router } from 'react-router';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fromJS } from 'immutable';
import { AsyncRouterContext } from 'redux-async-props';
import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable';
import SmartBanner from 'react-smartbanner';
import '../node_modules/react-smartbanner/dist/main.css';

import { LOGIN_SUCCESS, DOWNLOAD_PAGE_SHOWED, doInit } from './pages/app/actions';
import { getRoutes } from './routes';
import app from './pages/app/reducer';
import newHome from './pages/reducer';
import { getLocalStorage, isServer } from './utils';

import * as actions from './pages/actions';

// Enable some stuff during development to ease debugging
if (process.env.NODE_ENV !== 'production') {
  // For dev tool support, attach to window...
  window.React = React;
}

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  app,
  form,
  routing: routerReducer,
  newHome
});

/**
 * Creates a Redux store that holds the complete state tree of this app.
 * @param {object} theHistory The history used during redux store synchronization.
 * @param {function(state, action: object)} reducers A reducing function that returns the next state tree, given the current state tree and an action to handle.
 * @param {any} initialState
 * @return A redux store.
 */
export function createOurStore (theHistory, reducers, initialState) {
  const middleware = [];
  // Install thunk middleware
  middleware.push(thunkMiddleware);
  // Install react-router-redux's router middleware
  middleware.push(routerMiddleware(theHistory));
  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  if (__DEVELOPMENT__) {
    return newCreateStore(
      reducers,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return newCreateStore(
    reducers,
    initialState
  );
}

async function boot () {
  // Make sure theoplayer is accessible.
  /*
  if (!isServer()) {
    const a = document.createElement('script');
    const b = document.getElementsByTagName('script')[0];
    a.src = `${document.location.protocol}//cdn.theoplayer.com/latest/f9ae73eb-ac57-42ae-acdb-1ff18be7c597/theoplayer.loader.js`;
    a.type = 'text/javascript';
    b.parentNode.insertBefore(a, b);
  }
  */
  // Create redux store
  const initialState = fromJS({});
  const store = createOurStore(browserHistory, rootReducer, initialState);
  // Create an enhanced history that syncs navigation events with the store.
  const ourHistory = syncHistoryWithStore(browserHistory, store, { selectLocationState: (state) => state.get('routing') });
  // Clear state on start
  ourHistory.replace(ourHistory.createLocation({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    state: null // Remove state
  }));
  // Initialize the app.
  await store.dispatch(doInit());
  // Load session from local storage.
  const storage = getLocalStorage();
  const session = storage.getItem('session');
  if (!isServer()) {
    const data = await store.dispatch(actions.loadAppboyApiKey());
    /* eslint-disable */
    +function (a, p, P, b, y) {
      window.appboy = {};
      for (var s="destroy getDeviceId toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick logInAppMessageHtmlClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked isPushGranted isPushPermissionGranted registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.User.prototype.addAlias ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.ImageStyle ab.InAppMessage.Orientation ab.InAppMessage.CropType ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.HtmlMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner ab.WindowUtils display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "),i=0;i<s.length;i++){for(var k=appboy,l=s[i].split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=function(){console&&console.error("The Appboy SDK has not yet been loaded.")}}appboy.initialize=function(){console&&console.error("Appboy cannot be loaded - this is usually due to strict corporate firewalls or ad blockers.")};appboy.getUser=function(){return new appboy.ab.User};appboy.getCachedFeed=function(){return new appboy.ab.Feed};
      appboy.getUser = function () {
        return new appboy.ab.User
      };
      appboy.getCachedFeed = function () {
        return new appboy.ab.Feed
      };
      (y = a.createElement(p)).type = 'text/javascript';
      y.src = 'https://js.appboycdn.com/web-sdk/1.6/appboy.min.js';
      (window.c = a.getElementsByTagName(p)[0]).parentNode.insertBefore(y, window.c);
      if (y.addEventListener) {
        y.addEventListener("load", b, false);
      } else if (y.readyState) {
        y.onreadystatechange = b;
      }
    }(document, 'script', 'link', function() {
      appboy.initialize(data.appBoyApiKey, { baseUrl: 'https://customer.api.appboy.eu/api/v3' });
      appboy.display.automaticallyShowNewInAppMessages();
      if (session) {
        const sessionData = JSON.parse(session);
        if (!isServer() && sessionData.user.id && window && window.appboy) {
          appboy.changeUser(sessionData.user.id);
        }
      }
      appboy.openSession();
    });
    /* eslint-enable */
  }

  if (session) {
    try {
      const sessionData = JSON.parse(session);
      Reflect.deleteProperty(sessionData, 'initialValues');
      store.dispatch({ data: sessionData, type: LOGIN_SUCCESS });
    } catch (e) {
      console.log(e);
    }
  }
  const isDownloadPageShowed = storage.getItem('downloadPageShowed');
  if (isDownloadPageShowed) {
    store.dispatch({ downloadPageShowed: JSON.parse(isDownloadPageShowed), type: DOWNLOAD_PAGE_SHOWED });
  }

  // Render application
  ReactDOM.render(
    <StyleRoot>
      <Provider key='provider' store={store}>
        <Router history={ourHistory} render={(props) => <AsyncRouterContext {...props} asyncProps={initialState.get('asyncProps')} />}>
          {getRoutes(store)}
        </Router>
      </Provider>
    </StyleRoot>,
    document.getElementById('root'));

  // Render app banner
  if (navigator.userAgent.match(/Android/i)) {
    ReactDOM.render(<SmartBanner force={'android'} title={'Spott'}/>, document.getElementById('banner-content'));
  }
}

boot();
