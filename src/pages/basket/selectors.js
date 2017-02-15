import { createStructuredSelector } from 'reselect';
import { isUbAuthenticatedSelector, currentUserIdSelector } from '../app/selector';

export const basketDataSelector = (state) => state.getIn([ 'basket', 'basketData' ]);
export const basketPersonalInfoSelector = (state) => state.getIn([ 'basket', 'personalInfo' ]);
export const basketUbUserSelector = (state) => state.getIn([ 'basket', 'ubUser' ]);
export const basketUserAddressesSelector = (state) => state.getIn([ 'basket', 'ubUserAddresses' ]);
export const basketUserCardsSelector = (state) => state.getIn([ 'basket', 'ubUserCards' ]);
export const _basketEditAddressDataSelector = (state) => state.getIn([ 'basket', 'editAddressData' ]);
export const basketSpottProductsSelector = (state) => state.getIn([ 'basket', 'spottProducts' ]);

export const basketSelector = createStructuredSelector({
  isUbAuthenticated: isUbAuthenticatedSelector,
  basketData: basketDataSelector,
  userId: currentUserIdSelector,
  personalInfo: basketPersonalInfoSelector,
  ubUser: basketUbUserSelector,
  userAddresses: basketUserAddressesSelector,
  userCards: basketUserCardsSelector,
  spottProducts: basketSpottProductsSelector
});

export const basketEditAddressDataSelector = createStructuredSelector({
  initialValues: _basketEditAddressDataSelector
});

export const _ordersSelector = (state) => state.getIn([ 'basket', 'orders' ]);
export const ordersSelector = createStructuredSelector({
  isUbAuthenticated: isUbAuthenticatedSelector,
  orders: _ordersSelector,
  spottProducts: basketSpottProductsSelector
});
