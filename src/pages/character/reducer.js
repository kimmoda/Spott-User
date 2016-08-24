import { Map } from 'immutable';
import * as actions from './actions';

export default function characterReducer (state = Map({
  currentCharacter: null
}), action) {
  switch (action.type) {
    case actions.LOAD_CHARACTER:
      return state.set('currentCharacter', Map({ id: action.characterId }));
    case actions.LOAD_CHARACTER_ERROR:
      return state.mergeIn([ 'currentCharacter' ], Map({ _error: action.error }));
    default:
      return state;
  }
}
