import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector } from '../app/selector';
import {
  createEntityByIdSelector, createEntitiesByRelationSelector,
  charactersEntitiesSelector, characterHasProductsSelector, productsEntitiesSelector
} from '../../data/selector';

export const currentCharacterIdSelector = (state) => state.getIn([ 'character', 'currentCharacter', 'id' ]);

export const currentCharacterSelector = createEntityByIdSelector(charactersEntitiesSelector, currentCharacterIdSelector);

export const heroSelector = createStructuredSelector({
  character: currentCharacterSelector,
  isAuthenticated: isAuthenticatedSelector
});

export const characterProductsSelector = createStructuredSelector({
  // TODO update mediumHasTopUserProductsSelector.
  products: createEntitiesByRelationSelector(characterHasProductsSelector, currentCharacterIdSelector, productsEntitiesSelector)
});
