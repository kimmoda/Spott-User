import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector } from '../app/selector';
import { charactersEntitiesSelector, mediaEntitiesSelector, mediumHasCharactersSelector, mediumHasProductsSelector, productsEntitiesSelector } from '../../data/selector';
import { createEntityByIdSelector, createEntitiesByRelationSelector } from '../../utils';

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
export const topProductsSelector = createStructuredSelector({
  medium: currentMediumSelector,
  products: createEntitiesByRelationSelector(mediumHasProductsSelector, currentMediumIdSelector, productsEntitiesSelector)
});
