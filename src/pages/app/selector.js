export const apiBaseUrlSelector = (state) => state.getIn([ 'app', 'configuration', 'urls', 'api' ]);
export const cmsApiBaseUrlSelector = (state) => state.getIn([ 'app', 'configuration', 'urls', 'cmsApi' ]);

export const authenticationTokenSelector = (state) => state.getIn([ 'app', 'authentication', 'authenticationToken' ]);
export const authenticationErrorSelector = (state) => state.getIn([ 'app', 'authentication', 'error' ]);
export const authenticationIsLoadingSelector = (state) => state.getIn([ 'app', 'authentication', 'isLoading' ]);
export const currentUserFirstnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'firstname' ]);
export const currentUserUsernameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'username' ]);
export const currentUserIdSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'id' ]);
