import { Map, fromJS } from 'immutable';
import * as actions from './actions';

export default function productReducer (state = Map({
  currentProduct: null
}), action) {
  switch (action.type) {
    case actions.LOAD_PRODUCT:
      return state.set('currentProduct', Map({ id: action.productId }));
    case actions.LOAD_PRODUCT_ERROR:
      return state.mergeIn([ 'currentProduct' ], Map({ _error: action.error }));
    case actions.CHANGE_IMAGE_SELECTION:
      return state.setIn([ 'currentProduct', 'selectedImageId' ], action.imageId);
    case actions.CHANGE_UB_PRODUCT_VARIANT:
      return state.setIn([ 'currentProduct', 'selectedUbProductVariant' ], fromJS(action.variant));
    default:
      return state;
  }
}
