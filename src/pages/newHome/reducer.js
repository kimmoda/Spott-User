import { Map, List, fromJS } from 'immutable';
import * as actions from './actions';
import { FETCHING, ERROR, LOADED } from '../../data/statusTypes';

export default function newHomeReducer (state = Map({
  trendingTopics: Map(),
  topic: Map(),
  topicSpotts: Map(),
  topicRelated: Map(),
  spotts: Map(),
  spottsSubscribed: Map(),
  spottsPromoted: Map(),
  currentSpott: Map(),
  spottLovers: Map(),
  currentProduct: Map(),
  sidebarProducts: Map({ data: List() }),
  profile: Map({ subscriptions: Map() }),
  searchSuggestions: Map({
    isLoading: false,
    isSuccessful: false,
    error: null,
    items: List()
  })
}), action) {
  switch (action.type) {
    case actions.GET_TRENDING_TOPICS_START:
      return state.mergeIn([ 'trendingTopics' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TRENDING_TOPICS_SUCCESS:
      return state.set('trendingTopics', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TRENDING_TOPICS_ERROR:
      return state.mergeIn([ 'trendingTopics' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SPOTTS_START:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_SPOTTS_SUCCESS:
      return state.set('topicSpotts', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_SPOTTS_ERROR:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_RELATED_START:
      return state.mergeIn([ 'topicRelated' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_RELATED_SUCCESS:
      return state.set('topicRelated', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_RELATED_ERROR:
      return state.mergeIn([ 'topicRelated' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SET_TOPIC_SUBSCRIBER_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.SET_TOPIC_SUBSCRIBER_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.SET_TOPIC_SUBSCRIBER_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.REMOVE_TOPIC_SUBSCRIBER_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_TOPIC_SUBSCRIBER_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.REMOVE_TOPIC_SUBSCRIBER_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_LIST_START:
      return state.mergeIn([ 'spotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_LIST_SUCCESS:
      return state.set('spotts', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTTS_LIST_ERROR:
      return state.mergeIn([ 'spotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_SUBSCRIBED_LIST_START:
      return state.mergeIn([ 'spottsSubscribed' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_SUBSCRIBED_LIST_SUCCESS:
      return state.set('spottsSubscribed', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTTS_SUBSCRIBED_LIST_ERROR:
      return state.mergeIn([ 'spottsSubscribed' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_PROMOTED_LIST_START:
      return state.mergeIn([ 'spottsPromoted' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_PROMOTED_LIST_SUCCESS:
      return state.set('spottsPromoted', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTTS_PROMOTED_LIST_ERROR:
      return state.mergeIn([ 'spottsPromoted' ], Map({ _error: action.error, _status: ERROR }));

    case actions.LOAD_SPOTT_START:
      return state.set('currentSpott', Map({ uuid: action.uuid }));
    case actions.LOAD_SPOTT_ERROR:
      return state.mergeIn([ 'currentSpott' ], Map({ _error: action.error }));

    case actions.LOAD_PRODUCT_START:
      return state.set('currentProduct', Map({ uuid: action.uuid }));
    case actions.LOAD_PRODUCT_ERROR:
      return state.mergeIn([ 'currentProduct' ], Map({ _error: action.error }));

    case actions.LOAD_SIDEBAR_PRODUCT_START:
      return state.updateIn([ 'sidebarProducts', 'data' ], (data) => data.find((item) => item === action.uuid) ? data : data.push(action.uuid));
    case actions.LOAD_SIDEBAR_PRODUCT_ERROR:
      return state.mergeIn([ 'sidebarProducts' ], Map({ _error: action.error }));

    case actions.REMOVE_SIDEBAR_PRODUCT_START:
      return state.updateIn([ 'sidebarProducts', 'data' ], (data) => data.filter((item) => item !== action.uuid));
    case actions.REMOVE_SIDEBAR_PRODUCT_ERROR:
      return state.mergeIn([ 'sidebarProducts' ], Map({ _error: action.error }));

    case actions.CLEAR_SIDEBAR_PRODUCTS_START:
      return state.updateIn([ 'sidebarProducts', 'data' ], (data) => List());
    case actions.CLEAR_SIDEBAR_PRODUCTS_ERROR:
      return state.mergeIn([ 'sidebarProducts' ], Map({ _error: action.error }));

    case actions.GET_USER_SUBSCRIPTIONS_START:
      return state.mergeIn([ 'profile', 'subscriptions' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_SUBSCRIPTIONS_SUCCESS:
      return state.setIn([ 'profile', 'subscriptions' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_SUBSCRIPTIONS_ERROR:
      return state.mergeIn([ 'profile', 'subscriptions' ], Map({ _error: action.error, _status: ERROR }));

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
