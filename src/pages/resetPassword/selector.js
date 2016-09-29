import { createStructuredSelector } from 'reselect';

export const errorSelector = (state) => state.getIn([ 'resetPassword', 'error' ]);
export const isLoadingSelector = (state) => state.getIn([ 'resetPassword', 'isLoading' ]);
export const isSuccessfulSelector = (state) => state.getIn([ 'resetPassword', 'isSuccessful' ]);

export default createStructuredSelector({
  error: errorSelector,
  isLoading: isLoadingSelector,
  isSuccessful: isSuccessfulSelector
});
