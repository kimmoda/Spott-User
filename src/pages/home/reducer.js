import { fromJS } from 'immutable';
import * as actions from './actions';

export default function homeReducer (state = fromJS({
  searchSuggestions: {
    isLoading: false,
    isSuccessful: false,
    error: null,
    items: []
  }
}), action) {
  switch (action.type) {
    case actions.SEARCH_SUGGESTIONS_CLEAR:
      return state.merge({
        searchSuggestions: {
          isLoading: false,
          isSuccessful: false,
          items: [],
          error: null
        }
      });
    case actions.SEARCH_SUGGESTIONS_FETCH_START:
      return state.merge({
        searchSuggestions: {
          isLoading: true,
          isSuccessful: false,
          items: [],
          error: null
        }
      });
    case actions.SEARCH_SUGGESTIONS_FETCH_SUCCESS:
      return state.merge({
        searchSuggestions: {
          isLoading: false,
          isSuccessful: true,
          items: action.data,
          error: null
        }
      });
    case actions.SEARCH_SUGGESTIONS_FETCH_ERROR:
      return state.merge({
        searchSuggestions: {
          isLoading: false,
          isSuccessful: false,
          items: [],
          error: action.error
        }
      });
    default:
      return state;
  }
}
