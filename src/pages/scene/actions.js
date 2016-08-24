import { fetchProduct, fetchScene, removeSavedScene, saveScene } from '../../data/actions';
import { currentUserIdSelector } from '../app/selector';
import { currentSceneSelector } from './selector';

export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const LOAD_PRODUCT_ERROR = 'LOAD_PRODUCT_ERROR';

export const LOAD_SCENE = 'LOAD_SCENE';
export const LOAD_SCENE_ERROR = 'LOAD_SCENE_ERROR';

export const CHANGE_IMAGE_SELECTION = 'CHANGE_IMAGE_SELECTION';

export function loadProduct (productId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_PRODUCT, productId });
      return await dispatch(fetchProduct({ productId }));
    } catch (error) {
      return dispatch({ type: LOAD_PRODUCT_ERROR, productId, error });
    }
  };
}

export function loadScene (sceneId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ sceneId, type: LOAD_SCENE });
      return await dispatch(fetchScene({ sceneId }));
    } catch (error) {
      return dispatch({ type: LOAD_SCENE_ERROR, sceneId, error });
    }
  };
}

export function changeImageSelection (imageId) {
  return { type: CHANGE_IMAGE_SELECTION, imageId };
}

export function toggleSaveScene () {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    const scene = currentSceneSelector(state);

    if (scene.get('saved')) {
      await dispatch(removeSavedScene({ sceneId: scene.get('id'), userId }));
    } else {
      await dispatch(saveScene({ sceneId: scene.get('id'), userId }));
    }
    return await dispatch(fetchScene({ sceneId: scene.get('id') }));
  };
}
