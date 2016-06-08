export const apiBaseUrlSelector = (state) => state.getIn([ 'configuration', 'urls', 'api' ]);
export const cmsApiBaseUrlSelector = (state) => state.getIn([ 'configuration', 'urls', 'cmsApi' ]);

export const authenticationTokenSelector = (state) => state.getIn([ 'authentication', 'authenticationToken' ]);
export const authenticationErrorSelector = (state) => state.getIn([ 'authentication', 'error' ]);
export const authenticationIsLoadingSelector = (state) => state.getIn([ 'authentication', 'isLoading' ]);
export const userFirstnameSelector = (state) => state.getIn([ 'authentication', 'user', 'firstname' ]);
