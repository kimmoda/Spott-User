import { createSelector, createStructuredSelector } from 'reselect';
import { currentUserIdSelector as currentLoggedInUserIdSelector } from '../app/selector';
import { usersEntitiesSelector, userHasWishlistsRelationsSelector, wishlistsEntitiesSelector, wishlistHasProductsRelationsSelector, productsEntitiesSelector } from '../../data/selector';
import { createEntityByIdSelector, createEntitiesByRelationSelector } from '../../utils';

export const currentUserIdSelector = (state) => state.getIn([ 'profile', 'currentUser', 'id' ]);
export const currentWishlistIdSelector = (state) => state.getIn([ 'profile', 'currentWishlist', 'id' ]);

// View selector fro user profile
export const userSelector = createStructuredSelector({
  user: createEntityByIdSelector(usersEntitiesSelector, currentUserIdSelector)
});

// View selector for wishlists
export const wishlistsOfCurrentUserSelector = createSelector(
  currentLoggedInUserIdSelector,
  currentUserIdSelector,
  createEntitiesByRelationSelector(userHasWishlistsRelationsSelector, currentUserIdSelector, wishlistsEntitiesSelector),
  (currentLoggedInUserId, currentUserId, wishlists) => {
    const showPrivateWishlists = currentLoggedInUserId === currentUserId;
    return {
      wishlists: wishlists.set('data', wishlists.get('data').filter((wishlist) => wishlist.get('publicWishlist') || showPrivateWishlists))
    };
  }
);

// View selector for wishlist products
export const productsOfWishlistSelector = createStructuredSelector({
  productsOfWishlist: createEntitiesByRelationSelector(wishlistHasProductsRelationsSelector, currentWishlistIdSelector, productsEntitiesSelector),
  wishlist: createEntityByIdSelector(wishlistsEntitiesSelector, currentWishlistIdSelector)
});
