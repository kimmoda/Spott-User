import { Map } from 'immutable';
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
    default:
      return state;
  }
}
