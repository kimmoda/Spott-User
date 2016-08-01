import { Map } from 'immutable';
import * as actions from './actions';

export default function mediumReducer (state = Map({
  currentMedium: null
}), action) {
  switch (action.type) {
    case actions.LOAD_MEDIUM:
      return state.set('currentMedium', Map({ id: action.mediumId, type: action.mediumType }));
    case actions.LOAD_MEDIUM_ERROR:
      return state.mergeIn([ 'currentMedium' ], Map({ _error: action.error }));
    default:
      return state;
  }
}
