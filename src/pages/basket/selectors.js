import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector } from '../app/selector';

const basketDataSelector = (state) => state.getIn([ 'basket', 'basketData' ]);
export const basketSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  basketData: basketDataSelector
});
