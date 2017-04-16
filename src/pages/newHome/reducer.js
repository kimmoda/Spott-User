import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import { FETCHING, ERROR, LOADED } from '../../data/statusTypes';

export default function newHomeReducer (state = Map({
  trendingTopics: Map(),
  topic: Map(),
  topicSpotts: Map(),
  topicRelated: Map(),
  spotts: Map(),
  spott: Map(),
  spottLovers: Map()
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

    case actions.GET_SPOTT_START:
      return state.mergeIn([ 'spott' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTT_SUCCESS:
      return state.set('spott', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTT_ERROR:
      return state.mergeIn([ 'spott' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTT_LOVERS_START:
      return state.mergeIn([ 'spottLovers' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTT_LOVERS_SUCCESS:
      return state.set('spottLovers', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTT_LOVERS_ERROR:
      return state.mergeIn([ 'spottLovers' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SET_SPOTT_LOVER_START:
      return state.mergeIn([ 'spott' ], Map({ _error: null, _status: FETCHING }));
    case actions.SET_SPOTT_LOVER_SUCCESS:
      return state.set('spott', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.SET_SPOTT_LOVER_ERROR:
      return state.mergeIn([ 'spott' ], Map({ _error: action.error, _status: ERROR }));

    case actions.REMOVE_SPOTT_LOVER_START:
      return state.mergeIn([ 'spott' ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_SPOTT_LOVER_SUCCESS:
      return state.set('spott', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.REMOVE_SPOTT_LOVER_ERROR:
      return state.mergeIn([ 'spott' ], Map({ _error: action.error, _status: ERROR }));

    default:
      return state;
  }
}
