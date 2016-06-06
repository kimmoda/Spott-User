import { Map, fromJS } from 'immutable';
import * as actions from '../actions';

export default (state = Map(), action) => {
  switch (action.type) {
    case actions.CONFIGURE:
      return fromJS(action.configuration);
  }
  return state;
};
