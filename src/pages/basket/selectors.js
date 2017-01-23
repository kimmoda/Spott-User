import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector, currentUserIdSelector } from '../app/selector';

export const basketDataSelector = (state) => state.getIn([ 'basket', 'basketData' ]);
export const basketPersonalInfoSelector = (state) => state.getIn([ 'basket', 'personalInfo' ]);
export const basketUbUserSelector = (state) => state.getIn([ 'basket', 'ubUser' ]);

export const basketSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  basketData: basketDataSelector,
  userId: currentUserIdSelector,
  personalInfo: basketPersonalInfoSelector,
  ubUser: basketUbUserSelector
});
