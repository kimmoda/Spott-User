import { Map } from 'immutable';
import * as actions from './actions';

export default function productReducer (state = Map(), action) {
  switch (action.type) {
    case actions.LOAD_PRODUCT:
      return state.set('currentProductId', action.productId);
    case actions.CHANGE_IMAGE_SELECTION:
      return state.set('selectedImageId', action.imageId);
    default:
      return state;
  }
}
