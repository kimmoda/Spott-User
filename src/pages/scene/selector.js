import { createSelector, createStructuredSelector } from 'reselect';
import { createEntityByIdSelector, productsEntitiesSelector, scenesEntitiesSelector } from '../../data/selector';
import { isAuthenticatedSelector } from '../app/selector';

export const currentProductIdSelector = (state) => state.getIn([ 'scene', 'currentProduct', 'id' ]);
export const currentSceneIdSelector = (state) => state.getIn([ 'scene', 'currentScene', 'id' ]);

export const currentProductSelector = createEntityByIdSelector(productsEntitiesSelector, currentProductIdSelector);
export const currentSceneSelector = createEntityByIdSelector(scenesEntitiesSelector, currentSceneIdSelector);

const _selectedImageIdSelector = (state) => state.getIn([ 'scene', 'currentProduct', 'selectedImageId' ]);
export const selectedImageIdSelector = createSelector(
  currentProductSelector,
  _selectedImageIdSelector,
  (product, selectedImageId) => selectedImageId || (product.get('images') && product.getIn([ 'images', '0', 'id' ]))
);

// View selector for product detail page.
export const productSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  product: currentProductSelector,
  scene: currentSceneSelector,
  selectedImageId: selectedImageIdSelector
});
