import { makeApiActionCreator } from '../../data/actions';
import * as api from '../../api/new';

// Action types
// ////////////

export const GET_TRENDING_TOPICS_START = 'NEW/GET_TRENDING_TOPICS_START';
export const GET_TRENDING_TOPICS_SUCCESS = 'NEW/GET_TRENDING_TOPICS_SUCCESS';
export const GET_TRENDING_TOPICS_ERROR = 'NEW/GET_TRENDING_TOPICS_ERROR';

export const GET_TOPIC_START = 'NEW/GET_TOPIC_START';
export const GET_TOPIC_SUCCESS = 'NEW/GET_TOPIC_SUCCESS';
export const GET_TOPIC_ERROR = 'NEW/GET_TOPIC_ERROR';

export const GET_TOPIC_SPOTTS_START = 'NEW/GET_TOPIC_SPOTTS_START';
export const GET_TOPIC_SPOTTS_SUCCESS = 'NEW/GET_TOPIC_SPOTTS_SUCCESS';
export const GET_TOPIC_SPOTTS_ERROR = 'NEW/GET_TOPIC_SPOTTS_ERROR';

export const GET_TOPIC_RELATED_START = 'NEW/GET_TOPIC_RELATED_START';
export const GET_TOPIC_RELATED_SUCCESS = 'NEW/GET_TOPIC_RELATED_SUCCESS';
export const GET_TOPIC_RELATED_ERROR = 'NEW/GET_TOPIC_RELATED_ERROR';

export const GET_TOPIC_SUBSCRIBERS_START = 'NEW/GET_TOPIC_SUBSCRIBERS_START';
export const GET_TOPIC_SUBSCRIBERS_SUCCESS = 'NEW/GET_TOPIC_SUBSCRIBERS_SUCCESS';
export const GET_TOPIC_SUBSCRIBERS_ERROR = 'NEW/GET_TOPIC_SUBSCRIBERS_ERROR';

export const GET_SPOTTS_LIST_START = 'NEW/GET_SPOTTS_LIST_START';
export const GET_SPOTTS_LIST_SUCCESS = 'NEW/GET_SPOTTS_LIST_SUCCESS';
export const GET_SPOTTS_LIST_ERROR = 'NEW/GET_SPOTTS_LIST_ERROR';

export const GET_SPOTT_START = 'NEW/GET_SPOTT_START';
export const GET_SPOTT_SUCCESS = 'NEW/GET_SPOTT_SUCCESS';
export const GET_SPOTT_ERROR = 'NEW/GET_SPOTT_ERROR';

export const GET_SPOTT_LOVERS_START = 'NEW/GET_SPOTT_LOVERS_START';
export const GET_SPOTT_LOVERS_SUCCESS = 'NEW/GET_SPOTT_LOVERS_SUCCESS';
export const GET_SPOTT_LOVERS_ERROR = 'NEW/GET_SPOTT_LOVERS_ERROR';

// Actions creators
// ////////////////

export const loadTrendingTopics = makeApiActionCreator(api.getTrendingTopics, GET_TRENDING_TOPICS_START, GET_TRENDING_TOPICS_SUCCESS, GET_TRENDING_TOPICS_ERROR);

export const loadTopic = makeApiActionCreator(api.getTopic, GET_TOPIC_START, GET_TOPIC_SUCCESS, GET_TOPIC_ERROR);

export const loadTopicSpotts = makeApiActionCreator(api.getTopicSpotts, GET_TOPIC_SPOTTS_START, GET_TOPIC_SPOTTS_SUCCESS, GET_TOPIC_SPOTTS_ERROR);

export const loadTopicRelated = makeApiActionCreator(api.getTopicRelated, GET_TOPIC_RELATED_START, GET_TOPIC_RELATED_SUCCESS, GET_TOPIC_RELATED_ERROR);

export function loadTopicDetails ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      dispatch(loadTopic({ uuid }));
      dispatch(loadTopicSpotts({ uuid }));
      dispatch(loadTopicRelated({ uuid }));
    } catch (error) {
      throw error;
    }
  };
}

export const loadSpottsList = makeApiActionCreator(api.getSpottsList, GET_SPOTTS_LIST_START, GET_SPOTTS_LIST_SUCCESS, GET_SPOTTS_LIST_ERROR);

export const loadSpott = makeApiActionCreator(api.getSpott, GET_SPOTT_START, GET_SPOTT_SUCCESS, GET_SPOTT_ERROR);

export const loadSpottLovers = makeApiActionCreator(api.getSpottLovers, GET_SPOTT_LOVERS_START, GET_SPOTT_LOVERS_SUCCESS, GET_SPOTT_LOVERS_ERROR);
