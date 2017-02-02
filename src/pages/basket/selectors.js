import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector, currentUserIdSelector } from '../app/selector';

export const basketDataSelector = (state) => state.getIn([ 'basket', 'basketData' ]);
export const basketPersonalInfoSelector = (state) => state.getIn([ 'basket', 'personalInfo' ]);
export const basketUbUserSelector = (state) => state.getIn([ 'basket', 'ubUser' ]);
export const basketUserAddressesSelector = (state) => state.getIn([ 'basket', 'ubUserAddresses' ]);
export const basketUserCardsSelector = (state) => state.getIn([ 'basket', 'ubUserCards' ]);
export const _basketEditAddressDataSelector = (state) => state.getIn([ 'basket', 'editAddressData' ]);

export const basketSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  basketData: basketDataSelector,
  userId: currentUserIdSelector,
  personalInfo: basketPersonalInfoSelector,
  ubUser: basketUbUserSelector,
  userAddresses: basketUserAddressesSelector,
  userCards: basketUserCardsSelector
});

export const basketEditAddressDataSelector = createStructuredSelector({
  initialValues: _basketEditAddressDataSelector
});
