import { createStructuredSelector } from 'reselect';
import { createEntityByIdSelector, createEntitiesByIdSelector } from '../../selectors/_utils';

export const currentUserIdSelector = (state) => state.getIn([ 'profile', 'currentUser' ]);
export const currentWishlistIdSelector = (state) => state.getIn([ 'profile', 'currentWishlist' ]);

// View selector fro user profile
export const userSelector = createStructuredSelector({
  user: createEntityByIdSelector((state) => state.getIn([ 'profile', 'users' ]), currentUserIdSelector)
});

// View selector for wishlists
export const wishlistsOfCurrentUserSelector = createStructuredSelector({
  wishlists: createEntitiesByIdSelector((state) => state.getIn([ 'profile', 'wishlistsOfUser' ]), currentUserIdSelector)
});

// View selector for wishlist products
export const productsOfWishlistSelector = createStructuredSelector({
  productsOfWishlist: createEntitiesByIdSelector((state) => state.getIn([ 'profile', 'productsOfWishlist' ]), currentWishlistIdSelector)
});
