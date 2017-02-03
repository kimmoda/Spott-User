import { createStructuredSelector } from 'reselect';

export const acceptCookiesSelector = (state) => state.getIn([ 'app', 'configuration', 'acceptCookies' ]);
export const apiBaseUrlSelector = (state) => state.getIn([ 'app', 'configuration', 'urls', 'api' ]);
export const cmsApiBaseUrlSelector = (state) => state.getIn([ 'app', 'configuration', 'urls', 'cmsApi' ]);
export const currentLocaleSelector = (state) => state.getIn([ 'app', 'configuration', 'currentLocale' ]);
export const facebookAppIdSelector = (state) => state.getIn([ 'app', 'configuration', 'facebookAppId' ]);

export const authenticationTokenSelector = (state) => state.getIn([ 'app', 'authentication', 'authenticationToken' ]);
export const authenticationErrorSelector = (state) => state.getIn([ 'app', 'authentication', 'error' ]);
export const authenticationIsLoadingSelector = (state) => state.getIn([ 'app', 'authentication', 'isLoading' ]);
export const registrationFacebookErrorSelector = (state) => state.getIn([ 'app', 'registration', 'error' ]);
export const registrationFacebookIsLoadingSelector = (state) => state.getIn([ 'app', 'registration', 'isLoading' ]);
export const currentUserAvatarSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'avatar' ]);
export const currentUserFirstnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'firstname' ]);
export const currentUserLastnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'lastname' ]);
export const currentUserUsernameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'username' ]);
export const currentUserIdSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'id' ]);
export const isAuthenticatedSelector = (state) => Boolean(state.getIn([ 'app', 'authentication', 'user', 'id' ]));
export const isUbAuthenticatedSelector = (state) => Boolean(state.getIn([ 'app', 'authentication', 'ubAuthenticationToken' ]));

export const currentUrlSelector = (state) => state.getIn([ 'routing', 'locationBeforeTransitions', 'pathname' ]);
export const isDownloadPageShowedSelector = (state) => state.getIn([ 'app', 'configuration', 'downloadPageShowed' ]);

export const ubAuthenticationTokenSelector = (state) => state.getIn([ 'app', 'authentication', 'ubAuthenticationToken' ]);

export const appSelector = createStructuredSelector({
  acceptCookies: acceptCookiesSelector
});
