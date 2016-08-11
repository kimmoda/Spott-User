import { createSelector, createStructuredSelector } from 'reselect';
import { createEntityByIdSelector, productsEntitiesSelector, scenesEntitiesSelector } from '../../data/selector';

export const currentProductIdSelector = (state) => state.getIn([ 'scene', 'currentProduct', 'id' ]);
export const currentSceneIdSelector = (state) => state.getIn([ 'scene', 'currentScene', 'id' ]);

const currentProductSelector = createEntityByIdSelector(productsEntitiesSelector, currentProductIdSelector);
const currentSceneSelector = createEntityByIdSelector(scenesEntitiesSelector, currentSceneIdSelector);

const _selectedImageIdSelector = (state) => state.getIn([ 'scene', 'currentProduct', 'selectedImageId' ]);
export const selectedImageIdSelector = createSelector(
  currentProductSelector,
  _selectedImageIdSelector,
  (product, selectedImageId) => selectedImageId || (product.get('images') && product.getIn([ 'images', '0', 'id' ]))
);

// View selector for product detail page.
export const productSelector = createStructuredSelector({
  product: currentProductSelector,
  scene: currentSceneSelector,
  selectedImageId: selectedImageIdSelector
});
