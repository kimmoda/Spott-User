import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

/**
 * Creates a Redux store that holds the complete state tree of this app.
 * @param {object} theHistory The history used during redux store synchronization.
 * @param {function(state, action: object)} reducers A reducing function that returns the next state tree, given the current state tree and an action to handle.
 * @param {any} initialState
 * @return A redux store.
 */
export default function (theHistory, reducers, initialState) {
  const middleware = [];
  // Install thunk middleware
  middleware.push(thunkMiddleware);
  // Install react-router-redux's router middleware
  middleware.push(routerMiddleware(theHistory));
  // Install logging middleware when not in production
  if (__DEVELOPMENT__) {
    const createLogger = require('redux-logger');
    middleware.push(createLogger({
      // Collapse by default to preserve space in the console
      collapsed: true,
      // Convert Immutable state to plain JavaScript object, before logging.
      stateTransformer: (state) => state.toJS()
    }));
  }
  // Construct our new createStore() function, using given middleware
  const newCreateStore = Reflect.apply(applyMiddleware, null, middleware)(createStore);
  // Create the store
  return newCreateStore(reducers, initialState);
}
