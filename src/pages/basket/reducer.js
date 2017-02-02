import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import * as appActions from '../app/actions';

export default function basketReducer (state = Map({
  basketData: Map(),
  delivery: null,
  personalInfo: Map(),
  verifyMobile: null,
  ubUser: Map(),
  ubUserAddresses: Map(),
  ubUserCards: Map(),
  editAddressData: null
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
    case actions.LOAD_UB_USER_ADDRESSES_SUCCESS:
      return state.set('ubUserAddresses', fromJS(action.data.addresses));
    case actions.LOAD_CARDS_SUCCESS:
      return state.set('ubUserCards', fromJS(action.data.cards));
    case actions.SELECT_ADDRESS_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    case actions.LOAD_EDIT_ADDRESS_DATA:
      return state.set('editAddressData', action.payload);
    case actions.SELECT_CARD_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    default:
      return state;
  }
}
