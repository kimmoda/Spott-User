import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import configuration from './configuration';
import authentication from './authentication';
import profile from './profile';

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  authentication,
  configuration,
  profile,
  routing: routerReducer
});

export default rootReducer;
