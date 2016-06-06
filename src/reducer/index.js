import { combineReducers } from 'redux-immutablejs';
import { routerReducer } from 'react-router-redux';
import configuration from './configuration';
import authentication from './authentication';

// add the router reducer to the store on the 'routing' key
const rootReducer = combineReducers({
  authentication,
  configuration,
  routing: routerReducer
});

export default rootReducer;
