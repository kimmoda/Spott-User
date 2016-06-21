import { fromJS } from 'immutable';
import * as actions from './actions';
import { fetchStart, fetchSuccess, fetchError } from '../../utils';

export default function productReducer (state = fromJS({
  currentProduct: {}
}), action) {
  switch (action.type) {
    case actions.LOAD_PRODUCT_START:
      return fetchStart(state, [ 'currentProduct' ]);
    case actions.LOAD_PRODUCT_SUCCESS:
      return fetchSuccess(state, [ 'currentProduct' ], action.data);
    case actions.LOAD_PRODUCT_ERROR:
      return fetchError(state, [ 'currentProduct' ], action.error);
    default:
      return state;
  }
}
