import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import * as appActions from '../app/actions';
import { FETCHING, ERROR, LOADED } from '../../data/statusTypes';

export default function basketReducer (state = Map({
  basketData: Map(),
  delivery: null,
  personalInfo: Map(),
  verifyMobile: null,
  ubUser: Map(),
  ubUserAddresses: Map(),
  ubUserCards: Map(),
  editAddressData: null,
  editCardData: null,
  spottProducts: Map(),
  orders: Map(),
  addressForm: Map()
}), action) {
  switch (action.type) {
    case actions.ADD_PRODUCT_START:
      return state.mergeIn([ 'basketData' ], Map({ _error: null, _status: FETCHING }));
    case actions.ADD_PRODUCT_SUCCESS:
      return state.set('basketData', fromJS({ ...action.data.basket, _error: null, _status: LOADED }));
    case actions.ADD_PRODUCT_ERROR:
      return state.mergeIn([ 'basketData' ], Map({ _error: action.error, _status: ERROR }));
    case actions.REMOVE_PRODUCT_START:
      return state.mergeIn([ 'basketData' ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_PRODUCT_SUCCESS:
      return state.set('basketData', fromJS({ ...action.data.basket, _error: null, _status: LOADED }));
    case actions.REMOVE_PRODUCT_ERROR:
      return state.mergeIn([ 'basketData' ], Map({ _error: action.error, _status: ERROR }));
    case actions.LOAD_BASKET_START:
      return state.mergeIn([ 'basketData' ], Map({ _error: null, _status: FETCHING }));
    case actions.LOAD_BASKET_SUCCESS:
      return state.set('basketData', fromJS({ ...action.data.basket, _error: null, _status: LOADED }));
    case actions.LOAD_BASKET_ERROR:
      return state.mergeIn([ 'basketData' ], Map({ _error: action.error, _status: ERROR }));
    case actions.SELECT_CARD_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    case actions.SELECT_ADDRESS_SUCCESS:
      return state.set('basketData', fromJS(action.data.basket));
    case actions.SELECT_PRODUCT_VARIANT_START:
      return state.mergeIn([ 'basketData' ], Map({ _error: null, _status: FETCHING }));
    case actions.SELECT_PRODUCT_VARIANT_SUCCESS:
      return state.set('basketData', fromJS({ ...action.data.basket, _error: null, _status: LOADED }));
    case actions.SELECT_PRODUCT_VARIANT_ERROR:
      return state.mergeIn([ 'basketData' ], Map({ _error: action.error, _status: ERROR }));
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
    case actions.LOAD_EDIT_ADDRESS_DATA:
      return state.set('editAddressData', action.payload);
    case actions.LOAD_EDIT_CARD_DATA:
      return state.set('editCardData', action.payload);
    case actions.SET_SPOTT_PRODUCTS:
      return state.mergeIn([ 'spottProducts' ], fromJS(action.payload));
    case actions.LOAD_ORDERS_START:
      return state.mergeIn([ 'orders' ], Map({ _error: null, _status: FETCHING }));
    case actions.LOAD_ORDERS_SUCCESS:
      return state.set('orders', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.LOAD_ORDERS_ERROR:
      return state.mergeIn([ 'orders' ], Map({ _error: action.error, _status: ERROR }));
    case actions.REMOVE_ADDRESS_ERROR:
      return state.mergeIn([ 'addressForm' ], Map({ _error: action.error, _status: ERROR }));
    default:
      return state;
  }
}
