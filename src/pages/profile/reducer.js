import { fromJS, Map } from 'immutable';
import * as actions from './actions';

export default function profileReducer (state = fromJS({
  currentUser: null,
  currentWishlist: null
}), action) {
  switch (action.type) {
    case actions.LOAD_USER:
      return state.set('currentUser', Map({ id: action.userId }));
    case actions.LOAD_USER_ERROR:
      return state.mergeIn([ 'currentUser' ], Map({ _error: action.error }));
    case actions.LOAD_WISHLISTS_OF_USER:
      return state.set('wishlistsOfUser', Map({ id: action.userId }));
    case actions.LOAD_WISHLISTS_OF_USER_ERROR:
      return state.mergeIn([ 'wishlistsOfUser' ], Map({ _error: action.error }));
    case actions.LOAD_PRODUCTS_OF_WISHLIST:
      return state.set('currentWishlist', Map({ id: action.wishlistId }));
    case actions.LOAD_PRODUCTS_OF_WISHLIST_ERROR:
      return state.mergeIn([ 'currentWishlist' ], Map({ _error: action.error }));
    default:
      return state;
  }
}
