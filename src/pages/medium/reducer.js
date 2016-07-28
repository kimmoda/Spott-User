import { Map } from 'immutable';
import * as actions from './actions';

export default function seriesReducer (state = Map({
  currentSeries: null
}), action) {
  switch (action.type) {
    case actions.LOAD_SERIES:
      return state.set('currentSeries', Map({ id: action.seriesId }));
    case actions.LOAD_SERIES_ERROR:
      return state.mergeIn([ 'currentSeries' ], Map({ _error: action.error }));
    default:
      return state;
  }
}
