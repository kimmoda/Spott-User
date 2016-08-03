import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector } from '../app/selector';
import { createEntityByIdSelector, createEntitiesByRelationSelector, charactersEntitiesSelector, mediaEntitiesSelector, mediumHasCharactersSelector, mediumHasProductsSelector, mediumHasTopUserProductsSelector, productsEntitiesSelector } from '../../data/selector';

export const currentMediumIdSelector = (state) => state.getIn([ 'medium', 'currentMedium', 'id' ]);

export const currentMediumSelector = createEntityByIdSelector(mediaEntitiesSelector, currentMediumIdSelector);

export const heroSelector = createStructuredSelector({
  characters: createEntitiesByRelationSelector(mediumHasCharactersSelector, currentMediumIdSelector, charactersEntitiesSelector),
  isAuthenticated: isAuthenticatedSelector
});

export const mediumSelector = createStructuredSelector({
  medium: currentMediumSelector
});

// Overview
export const pickedForYouSelector = createStructuredSelector({
  products: createEntitiesByRelationSelector(mediumHasTopUserProductsSelector, currentMediumIdSelector, productsEntitiesSelector)
});

export const topProductsSelector = createStructuredSelector({
  medium: currentMediumSelector,
  products: createEntitiesByRelationSelector(mediumHasProductsSelector, currentMediumIdSelector, productsEntitiesSelector)
});
