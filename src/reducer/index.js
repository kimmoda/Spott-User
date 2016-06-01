import { Map } from 'immutable';
import * as actions from '../actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case actions.CONFIGURE:
      return state.set('configuration', action.configuration);
  }
  return state;
};
