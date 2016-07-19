import { createStructuredSelector } from 'reselect';
import {
  mediaEntitiesSelector, productsEntitiesSelector,
  recentlyAddedMediaListSelector, recentlyAddedToWishlistProductsListSelector,
  createEntitiesByListSelector
} from '../../data/selector';
import { isAuthenticatedSelector } from '../app/selector';

export const recentlyAddedSelector = createStructuredSelector({
  recentlyAddedMedia: createEntitiesByListSelector(recentlyAddedMediaListSelector, mediaEntitiesSelector)
});

export const recentlyAddedToWishlistSelector = createStructuredSelector({
  recentlyAddedToWishlistProducts: createEntitiesByListSelector(recentlyAddedToWishlistProductsListSelector, productsEntitiesSelector)
});

export const homeSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
});
