import { createSelector, createStructuredSelector } from 'reselect';
import { Map } from 'immutable';
import { LAZY, LOADED } from '../../data/statusTypes';
import { createEntityByIdSelector, productsEntitiesSelector, scenesEntitiesSelector } from '../../data/selector';
import { isAuthenticatedSelector } from '../app/selector';

export const currentProductIdSelector = (state) => state.getIn([ 'scene', 'currentProduct', 'id' ]);
export const currentSceneIdSelector = (state) => state.getIn([ 'scene', 'currentScene', 'id' ]);

export const currentSceneSelector = createEntityByIdSelector(scenesEntitiesSelector, currentSceneIdSelector);
export const _currentProductSelector = createEntityByIdSelector(productsEntitiesSelector, currentProductIdSelector);
export const currentProductSelector = createSelector(
  currentSceneSelector,
  currentProductIdSelector,
  _currentProductSelector,
  (scene, productId, productDetails) => {
    const sceneProduct = scene.get('products') && scene.get('products').find((p) => p.get('id') === productId);
    console.warn('sceneProduct', sceneProduct && sceneProduct.toJS());
    return sceneProduct ? productDetails.set('relevance', sceneProduct.get('relevance')) : productDetails;
  }
);

const _selectedImageIdSelector = (state) => state.getIn([ 'scene', 'currentProduct', 'selectedImageId' ]);
export const selectedImageIdSelector = createSelector(
  currentProductSelector,
  _selectedImageIdSelector,
  (product, selectedImageId) => selectedImageId || (product.get('images') && product.getIn([ 'images', '0', 'id' ]))
);

const _currentSceneDedupedSelector = createSelector(currentSceneSelector, (currentScene) => {
  // Filter duplicate products if necessary
  if (!currentScene || !currentScene.get('products')) {
    return currentScene;
  }
  const predicate = (x, index, self) =>
    (self.findIndex((t) => t.get('id') === x.get('id')) === index);
  return currentScene.set('products', currentScene.get('products').filter(predicate));
});
export const productSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector,
  product: currentProductSelector,
  scene: _currentSceneDedupedSelector,
  selectedImageId: selectedImageIdSelector
});
