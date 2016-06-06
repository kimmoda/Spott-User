export const baseUrlSelector = (state) => state.getIn([ 'configuration', 'urls', 'api' ]);

export const isLoginModalOpenSelector = (state) => state.getIn([ 'authentication', 'isLoginModalOpen' ]);
export const authenticationTokenSelector = (state) => state.getIn([ 'authentication', 'authenticationToken' ]);
export const authenticationErrorSelector = (state) => state.getIn([ 'authentication', 'error' ]);
export const authenticationIsLoadingSelector = (state) => state.getIn([ 'authentication', 'isLoading' ]);
export const userFirstnameSelector = (state) => state.getIn([ 'authentication', 'user', 'firstname' ]);
