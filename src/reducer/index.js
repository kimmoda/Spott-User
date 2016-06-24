import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import configuration from './configuration';
import authentication from './authentication';
import productDetail from '../view/productDetail/reducer';
import profile from '../view/profile/reducer';

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  authentication,
  configuration,
  productDetail,
  profile,
  routing: routerReducer
});

export default rootReducer;
