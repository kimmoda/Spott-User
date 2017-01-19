import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import * as appActions from '../app/actions';

export default function basketReducer (state = Map({
  basketData: Map(),
  delivery: null
}), action) {
  switch (action.type) {
    case actions.ADD_PRODUCT_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    case actions.REMOVE_PRODUCT_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    case actions.LOAD_BASKET_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    case appActions.LOGOUT_SUCCESS:
      return state.set('basketData', Map());
    default:
      return state;
  }
}
