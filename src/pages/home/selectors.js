import { createSelector, createStructuredSelector } from 'reselect';
import {
  mediaEntitiesSelector, productsEntitiesSelector,
  popularProductsListSelector, recentlyAddedMediaListSelector, recentlyAddedToWishlistProductsListSelector,
  newScenesForYouListSelector, scenesEntitiesSelector,
  createEntitiesByListSelector
} from '../../data/selector';
import { isAuthenticatedSelector } from '../app/selector';

const recentlyAddedMediaSelector = createEntitiesByListSelector(recentlyAddedMediaListSelector, mediaEntitiesSelector);
export const recentlyAddedSelector = createSelector(recentlyAddedMediaSelector, (recentlyAddedMedia) => {
  return {
    firstMedium: recentlyAddedMedia.getIn([ 'data', '0' ]),
    otherRecentlyAddedMedia: recentlyAddedMedia.set('data', recentlyAddedMedia.get('data').shift())
  };
});

export const recentlyAddedToWishlistSelector = createStructuredSelector({
  recentlyAddedToWishlistProducts: createEntitiesByListSelector(recentlyAddedToWishlistProductsListSelector, productsEntitiesSelector)
});

export const scenesForYouSelector = createStructuredSelector({
  scenes: createEntitiesByListSelector(newScenesForYouListSelector, scenesEntitiesSelector)
});

export const popularProductsSelector = createStructuredSelector({
  popularProducts: createEntitiesByListSelector(popularProductsListSelector, productsEntitiesSelector)
});

export const homeSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
});
