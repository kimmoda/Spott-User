import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import * as appActions from '../app/actions';

export default function basketReducer (state = Map({
  basketData: Map(),
  delivery: null,
  personalInfo: Map(),
  verifyMobile: null,
  ubUser: Map()
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
    case actions.SET_PERSONAL_INFO:
      return state.set('personalInfo', fromJS(action.payload));
    case actions.LOAD_UB_USER_SUCCESS:
      return state.set('ubUser', fromJS(action.data.user));
    default:
      return state;
  }
}
