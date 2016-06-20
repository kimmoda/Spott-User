import { fromJS } from 'immutable';
import * as actions from './actions';
import { fetchStart, fetchSuccess, fetchError } from '../../reducer/_utils';

export default function profileReducer (state = fromJS({
  users: {},
  currentUser: null,
  wishlistsOfUser: {},
  productsOfWishlist: {}
}), action) {
  switch (action.type) {
    case actions.LOAD_USER_START:
      return fetchStart(state, [ 'users', action.userId ])
        .set('currentUser', action.userId);
    case actions.LOAD_USER_SUCCESS:
      return fetchSuccess(state, [ 'users', action.userId ], action.data);
    case actions.LOAD_USER_ERROR:
      return fetchError(state, [ 'users', action.userId ], action.error);
    case actions.FETCH_WISHLISTS_OF_USER_START:
      return fetchStart(state, [ 'wishlistsOfUser', action.userId ]);
    case actions.FETCH_WISHLISTS_OF_USER_SUCCESS:
      return fetchSuccess(state, [ 'wishlistsOfUser', action.userId ], action.data); // Sets Map with _status, data (list) and pageCount
    case actions.FETCH_WISHLISTS_OF_USER_ERROR:
      return fetchError(state, [ 'wishlistsOfUser', action.userId ], action.error);
    case actions.FETCH_PRODUCTS_OF_WISHLIST_START:
      return fetchStart(state, [ 'productsOfWishlist', action.wishlistId ])
        .set('currentWishlist', action.wishlistId);
    case actions.FETCH_PRODUCTS_OF_WISHLIST_SUCCESS:
      return fetchSuccess(state, [ 'productsOfWishlist', action.wishlistId ], action.data);
    case actions.FETCH_PRODUCTS_OF_WISHLIST_ERROR:
      return fetchError(state, [ 'productsOfWishlist', action.wishlistId ], action.error);
    default:
      return state;
  }
}
