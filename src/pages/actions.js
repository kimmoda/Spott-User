import { makeApiActionCreator } from '../data/actions';
import * as api from '../api/new';
import { getLocalStorage, getDetailsDcFromLinks } from '../utils';
import { spottSelector, productSelector } from './selectors';
import { LOADED } from '../data/statusTypes';
import { apiBaseUrlSelector } from './app/selector';
import * as usersApi from '../api/users';
import { doLogin, doTryLoginFacebook } from './app/actions';
import { SubmissionError } from 'redux-form/immutable';
import moment from 'moment';

const storage = getLocalStorage();

// Action types
// ////////////

export const GET_TRENDING_TOPICS_START = 'NEW/GET_TRENDING_TOPICS_START';
export const GET_TRENDING_TOPICS_SUCCESS = 'NEW/GET_TRENDING_TOPICS_SUCCESS';
export const GET_TRENDING_TOPICS_ERROR = 'NEW/GET_TRENDING_TOPICS_ERROR';

export const GET_TRENDING_SERIES_START = 'NEW/GET_TRENDING_SERIES_START';
export const GET_TRENDING_SERIES_SUCCESS = 'NEW/GET_TRENDING_SERIES_SUCCESS';
export const GET_TRENDING_SERIES_ERROR = 'NEW/GET_TRENDING_SERIES_ERROR';

export const GET_TOPIC_START = 'NEW/GET_TOPIC_START';
export const GET_TOPIC_SUCCESS = 'NEW/GET_TOPIC_SUCCESS';
export const GET_TOPIC_ERROR = 'NEW/GET_TOPIC_ERROR';

export const GET_TOPIC_SPOTTS_START = 'NEW/GET_TOPIC_SPOTTS_START';
export const GET_TOPIC_SPOTTS_SUCCESS = 'NEW/GET_TOPIC_SPOTTS_SUCCESS';
export const GET_TOPIC_SPOTTS_MORE_SUCCESS = 'NEW/GET_TOPIC_SPOTTS_MORE_SUCCESS';
export const GET_TOPIC_SPOTTS_ERROR = 'NEW/GET_TOPIC_SPOTTS_ERROR';

export const GET_TOPIC_SEASONS_START = 'NEW/GET_TOPIC_SEASONS_START';
export const GET_TOPIC_SEASONS_SUCCESS = 'NEW/GET_TOPIC_SEASONS_SUCCESS';
export const GET_TOPIC_SEASONS_ERROR = 'NEW/GET_TOPIC_SEASONS_ERROR';

export const GET_TOPIC_SEASON_SPOTTS_START = 'NEW/GET_TOPIC_SEASON_SPOTTS_START';
export const GET_TOPIC_SEASON_SPOTTS_SUCCESS = 'NEW/GET_TOPIC_SEASON_SPOTTS_SUCCESS';
export const GET_TOPIC_SEASON_SPOTTS_MORE_SUCCESS = 'NEW/GET_TOPIC_SEASON_SPOTTS_MORE_SUCCESS';
export const GET_TOPIC_SEASON_SPOTTS_ERROR = 'NEW/GET_TOPIC_SEASON_SPOTTS_ERROR';

export const GET_TOPIC_SEASON_EPISODES_START = 'NEW/GET_TOPIC_SEASON_EPISODES_START';
export const GET_TOPIC_SEASON_EPISODES_SUCCESS = 'NEW/GET_TOPIC_SEASON_EPISODES_SUCCESS';
export const GET_TOPIC_SEASON_EPISODES_ERROR = 'NEW/GET_TOPIC_SEASON_EPISODES_ERROR';

export const GET_TOPIC_SEASON_EPISODE_SPOTTS_START = 'NEW/GET_TOPIC_SEASON_EPISODE_SPOTTS_START';
export const GET_TOPIC_SEASON_EPISODE_SPOTTS_SUCCESS = 'NEW/GET_TOPIC_SEASON_EPISODE_SPOTTS_SUCCESS';
export const GET_TOPIC_SEASON_EPISODE_SPOTTS_MORE_SUCCESS = 'NEW/GET_TOPIC_SEASON_EPISODE_SPOTTS_MORE_SUCCESS';
export const GET_TOPIC_SEASON_EPISODE_SPOTTS_ERROR = 'NEW/GET_TOPIC_SEASON_EPISODE_SPOTTS_ERROR';

export const GET_TOPIC_RELATED_START = 'NEW/GET_TOPIC_RELATED_START';
export const GET_TOPIC_RELATED_SUCCESS = 'NEW/GET_TOPIC_RELATED_SUCCESS';
export const GET_TOPIC_RELATED_ERROR = 'NEW/GET_TOPIC_RELATED_ERROR';

export const SET_TOPIC_SUBSCRIBER_START = 'NEW/SET_TOPIC_SUBSCRIBER_START';
export const SET_TOPIC_SUBSCRIBER_SUCCESS = 'NEW/SET_TOPIC_SUBSCRIBER_SUCCESS';
export const SET_TOPIC_SUBSCRIBER_ERROR = 'NEW/SET_TOPIC_SUBSCRIBER_ERROR';

export const REMOVE_TOPIC_SUBSCRIBER_START = 'NEW/REMPVE_TOPIC_SUBSCRIBER_START';
export const REMOVE_TOPIC_SUBSCRIBER_SUCCESS = 'NEW/REMOVE_TOPIC_SUBSCRIBER_SUCCESS';
export const REMOVE_TOPIC_SUBSCRIBER_ERROR = 'NEW/REMOVE_TOPIC_SUBSCRIBER_ERROR';

export const GET_SPOTTS_LIST_START = 'NEW/GET_SPOTTS_LIST_START';
export const GET_SPOTTS_LIST_SUCCESS = 'NEW/GET_SPOTTS_LIST_SUCCESS';
export const GET_SPOTTS_LIST_ERROR = 'NEW/GET_SPOTTS_LIST_ERROR';

export const GET_SPOTTS_SUBSCRIBED_LIST_START = 'NEW/GET_SPOTTS_SUBSCRIBED_LIST_START';
export const GET_SPOTTS_SUBSCRIBED_LIST_SUCCESS = 'NEW/GET_SPOTTS_SUBSCRIBED_LIST_SUCCESS';
export const GET_SPOTTS_SUBSCRIBED_LIST_ERROR = 'NEW/GET_SPOTTS_SUBSCRIBED_LIST_ERROR';

export const GET_SPOTTS_PROMOTED_LIST_START = 'NEW/GET_SPOTTS_PROMOTED_LIST_START';
export const GET_SPOTTS_PROMOTED_LIST_SUCCESS = 'NEW/GET_SPOTTS_PROMOTED_LIST_SUCCESS';
export const GET_SPOTTS_PROMOTED_LIST_ERROR = 'NEW/GET_SPOTTS_PROMOTED_LIST_ERROR';

export const CLEAR_SPOTTS_LIST = 'NEW/CLEAR_SPOTTS_LIST';

export const GET_SPOTT_START = 'NEW/GET_SPOTT_START';
export const GET_SPOTT_SUCCESS = 'NEW/GET_SPOTT_SUCCESS';
export const GET_SPOTT_ERROR = 'NEW/GET_SPOTT_ERROR';

export const GET_SPOTT_RELATED_TOPICS_START = 'NEW/GET_SPOTT_RELATED_TOPICS_START';
export const GET_SPOTT_RELATED_TOPICS_SUCCESS = 'NEW/GET_SPOTT_RELATED_TOPICS_SUCCESS';
export const GET_SPOTT_RELATED_TOPICS_ERROR = 'NEW/GET_SPOTT_RELATED_TOPICS_ERROR';

export const GET_SPOTT_SIMILAR_START = 'NEW/GET_SPOTT_SIMILAR_START';
export const GET_SPOTT_SIMILAR_SUCCESS = 'NEW/GET_SPOTT_SIMILAR_SUCCESS';
export const GET_SPOTT_SIMILAR_ERROR = 'NEW/GET_SPOTT_SIMILAR_ERROR';

export const GET_SPOTT_LOVERS_START = 'NEW/GET_SPOTT_LOVERS_START';
export const GET_SPOTT_LOVERS_SUCCESS = 'NEW/GET_SPOTT_LOVERS_SUCCESS';
export const GET_SPOTT_LOVERS_ERROR = 'NEW/GET_SPOTT_LOVERS_ERROR';

export const SET_SPOTT_LOVER_START = 'NEW/SET_SPOTT_LOVER_START';
export const SET_SPOTT_LOVER_SUCCESS = 'NEW/SET_SPOTT_LOVER_SUCCESS';
export const SET_SPOTT_LOVER_ERROR = 'NEW/SET_SPOTT_LOVER_ERROR';

export const REMOVE_SPOTT_LOVER_START = 'NEW/REMOVE_SPOTT_LOVER_START';
export const REMOVE_SPOTT_LOVER_SUCCESS = 'NEW/REMOVE_SPOTT_LOVER_SUCCESS';
export const REMOVE_SPOTT_LOVER_ERROR = 'NEW/REMOVE_SPOTT_LOVER_ERROR';

export const GET_PRODUCT_START = 'NEW/GET_PRODUCT_START';
export const GET_PRODUCT_SUCCESS = 'NEW/GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'NEW/GET_PRODUCT_ERROR';

export const GET_PRODUCT_SIMILAR_START = 'NEW/GET_PRODUCT_SIMILAR_START';
export const GET_PRODUCT_SIMILAR_SUCCESS = 'NEW/GET_PRODUCT_SIMILAR_SUCCESS';
export const GET_PRODUCT_SIMILAR_ERROR = 'NEW/GET_PRODUCT_SIMILAR_ERROR';

export const GET_PRODUCT_SPOTTS_START = 'NEW/GET_PRODUCT_SPOTTS_START';
export const GET_PRODUCT_SPOTTS_SUCCESS = 'NEW/GET_PRODUCT_SPOTTS_SUCCESS';
export const GET_PRODUCT_SPOTTS_ERROR = 'NEW/GET_PRODUCT_SPOTTS_ERROR';

export const LOAD_SIDEBAR_PRODUCT_START = 'NEW/LOAD_SIDEBAR_PRODUCT_START';
export const LOAD_SIDEBAR_PRODUCT_ERROR = 'NEW/LOAD_SIDEBAR_PRODUCT_ERROR';

export const REMOVE_SIDEBAR_PRODUCT_START = 'NEW/REMOVE_SIDEBAR_PRODUCT_START';
export const REMOVE_SIDEBAR_PRODUCT_ERROR = 'NEW/REMOVE_SIDEBAR_PRODUCT_ERROR';

export const CLEAR_SIDEBAR_PRODUCTS_START = 'NEW/CLEAR_SIDEBAR_PRODUCTS_START';
export const CLEAR_SIDEBAR_PRODUCTS_ERROR = 'NEW/CLEAR_SIDEBAR_PRODUCTS_ERROR';

export const GET_USER_SUBSCRIPTIONS_START = 'NEW/GET_USER_SUBSCRIPTIONS_START';
export const GET_USER_SUBSCRIPTIONS_SUCCESS = 'NEW/GET_USER_SUBSCRIPTIONS_SUCCESS';
export const GET_USER_SUBSCRIPTIONS_ERROR = 'NEW/GET_USER_SUBSCRIPTIONS_ERROR';

export const GET_USER_PROFILE_START = 'NEW/GET_USER_PROFILE_START';
export const GET_USER_PROFILE_SUCCESS = 'NEW/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'NEW/GET_USER_PROFILE_ERROR';

export const GET_USER_PROFILE_ACCOUNT_START = 'NEW/GET_USER_PROFILE_ACCOUNT_START';
export const GET_USER_PROFILE_ACCOUNT_SUCCESS = 'NEW/GET_USER_PROFILE_ACCOUNT_SUCCESS';
export const GET_USER_PROFILE_ACCOUNT_ERROR = 'NEW/GET_USER_PROFILE_ACCOUNT_ERROR';

export const SET_USER_PROFILE_ACCOUNT = 'NEW/SET_USER_PROFILE_ACCOUNT';

export const UPDATE_USER_PROFILE_START = 'NEW/UPDATE_USER_PROFILE_START';
export const UPDATE_USER_PROFILE_SUCCESS = 'NEW/UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_ERROR = 'NEW/UPDATE_USER_PROFILE_ERROR';

export const UPDATE_USER_AVATAR_START = 'NEW/UPDATE_USER_AVATAR_START';
export const UPDATE_USER_AVATAR_SUCCESS = 'NEW/UPDATE_USER_AVATAR_SUCCESS';
export const UPDATE_USER_AVATAR_ERROR = 'NEW/UPDATE_USER_AVATAR_ERROR';

export const UPDATE_USER_BACKGROUND_START = 'NEW/UPDATE_USER_BACKGROUND_START';
export const UPDATE_USER_BACKGROUND_SUCCESS = 'NEW/UPDATE_USER_BACKGROUND_SUCCESS';
export const UPDATE_USER_BACKGROUND_ERROR = 'NEW/UPDATE_USER_BACKGROUND_ERROR';

export const UPDATE_USER_PASSWORD_START = 'NEW/UPDATE_USER_PASSWORD_START';
export const UPDATE_USER_PASSWORD_SUCCESS = 'NEW/UPDATE_USER_PASSWORD_SUCCESS';
export const UPDATE_USER_PASSWORD_ERROR = 'NEW/UPDATE_USER_PASSWORD_ERROR';

export const RESET_USER_PASSWORD_START = 'NEW/RESET_USER_PASSWORD_START';
export const RESET_USER_PASSWORD_SUCCESS = 'NEW/RESET_USER_PASSWORD_SUCCESS';
export const RESET_USER_PASSWORD_ERROR = 'NEW/RESET_USER_PASSWORD_ERROR';

export const SET_USER_FOLLOWING_START = 'NEW/SET_USER_FOLLOWING_START';
export const SET_USER_FOLLOWING_SUCCESS = 'NEW/SET_USER_FOLLOWING_SUCCESS';
export const SET_USER_FOLLOWING_ERROR = 'NEW/SET_USER_FOLLOWING_ERROR';

export const REMOVE_USER_FOLLOWING_START = 'NEW/REMOVE_USER_FOLLOWING_START';
export const REMOVE_USER_FOLLOWING_SUCCESS = 'NEW/REMOVE_USER_FOLLOWING_SUCCESS';
export const REMOVE_USER_FOLLOWING_ERROR = 'NEW/REMOVE_USER_FOLLOWING_ERROR';

export const GET_USER_FOLLOWERS_START = 'NEW/GET_USER_FOLLOWERS_START';
export const GET_USER_FOLLOWERS_SUCCESS = 'NEW/GET_USER_FOLLOWERS_SUCCESS';
export const GET_USER_FOLLOWERS_MORE_SUCCESS = 'NEW/GET_USER_FOLLOWERS_MORE_SUCCESS';
export const GET_USER_FOLLOWERS_ERROR = 'NEW/GET_USER_FOLLOWERS_ERROR';

export const GET_USER_FOLLOWING_START = 'NEW/GET_USER_FOLLOWING_START';
export const GET_USER_FOLLOWING_SUCCESS = 'NEW/GET_USER_FOLLOWING_SUCCESS';
export const GET_USER_FOLLOWING_ERROR = 'NEW/GET_USER_FOLLOWING_ERROR';

export const GET_USER_LOVED_POSTS_START = 'NEW/GET_USER_LOVED_POSTS_START';
export const GET_USER_LOVED_POSTS_SUCCESS = 'NEW/GET_USER_LOVED_POSTS_SUCCESS';
export const GET_USER_LOVED_POSTS_ERROR = 'NEW/GET_USER_LOVED_POSTS_ERROR';

export const GET_USER_ACTIVITY_FEED_START = 'NEW/GET_USER_ACTIVITY_FEED_START';
export const GET_USER_ACTIVITY_FEED_SUCCESS = 'NEW/GET_USER_ACTIVITY_FEED_SUCCESS';
export const GET_USER_ACTIVITY_FEED_ERROR = 'NEW/GET_USER_ACTIVITY_FEED_ERROR';

export const GET_USER_WISHLIST_START = 'NEW/GET_USER_WISHLIST_START';
export const GET_USER_WISHLIST_SUCCESS = 'NEW/GET_USER_WISHLIST_SUCCESS';
export const GET_USER_WISHLIST_ERROR = 'NEW/GET_USER_WISHLIST_ERROR';

export const ADD_PRODUCT_TO_WISHLIST_START = 'NEW/ADD_PRODUCT_TO_WISHLIST_START';
export const ADD_PRODUCT_TO_WISHLIST_SUCCESS = 'NEW/ADD_PRODUCT_TO_WISHLIST_SUCCESS';
export const ADD_PRODUCT_TO_WISHLIST_ERROR = 'NEW/ADD_PRODUCT_TO_WISHLIST_ERROR';

export const REMOVE_PRODUCT_FROM_WISHLIST_START = 'NEW/REMOVE_PRODUCT_FROM_WISHLIST_START';
export const REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS = 'NEW/REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS';
export const REMOVE_PRODUCT_FROM_WISHLIST_ERROR = 'NEW/REMOVE_PRODUCT_FROM_TO_WISHLIST_ERROR';

export const SEARCH_SUGGESTIONS_FETCH_START = 'NEW/SEARCH_SUGGESTIONS_FETCH_START';
export const SEARCH_SUGGESTIONS_FETCH_SUCCESS = 'NEW/SEARCH_SUGGESTIONS_FETCH_SUCCESS';
export const SEARCH_SUGGESTIONS_FETCH_ERROR = 'NEW/SEARCH_SUGGESTIONS_FETCH_ERROR';
export const SEARCH_SUGGESTIONS_CLEAR = 'NEW/SEARCH_SUGGESTIONS_CLEAR';

export const GET_SEARCH_POSTS_START = 'NEW/GET_SEARCH_POSTS_START';
export const GET_SEARCH_POSTS_SUCCESS = 'NEW/GET_SEARCH_POSTS_SUCCESS';
export const GET_SEARCH_POSTS_ERROR = 'NEW/GET_SEARCH_POSTS_ERROR';

export const GET_SEARCH_POSTS_MORE_START = 'NEW/GET_SEARCH_POSTS_MORE_START';
export const GET_SEARCH_POSTS_MORE_SUCCESS = 'NEW/GET_SEARCH_POSTS_MORE_SUCCESS';
export const GET_SEARCH_POSTS_MORE_ERROR = 'NEW/GET_SEARCH_POSTS_MORE_ERROR';

export const GET_SEARCH_PERSONS_START = 'NEW/GET_SEARCH_PERSONS_START';
export const GET_SEARCH_PERSONS_SUCCESS = 'NEW/GET_SEARCH_PERSONS_SUCCESS';
export const GET_SEARCH_PERSONS_ERROR = 'NEW/GET_SEARCH_PERSONS_ERROR';

export const GET_SEARCH_TOPICS_START = 'NEW/GET_SEARCH_TOPICS_START';
export const GET_SEARCH_TOPICS_SUCCESS = 'NEW/GET_SEARCH_TOPICS_SUCCESS';
export const GET_SEARCH_TOPICS_ERROR = 'NEW/GET_SEARCH_TOPICS_ERROR';

export const GET_SEARCH_HISTORY_START = 'NEW/GET_SEARCH_HISTORY_START';
export const GET_SEARCH_HISTORY_SUCCESS = 'NEW/GET_SEARCH_HISTORY_SUCCESS';
export const GET_SEARCH_HISTORY_ERROR = 'NEW/GET_SEARCH_HISTORY_ERROR';

export const REMOVE_SEARCH_HISTORY_START = 'NEW/REMOVE_SEARCH_HISTORY_START';
export const REMOVE_SEARCH_HISTORY_SUCCESS = 'NEW/REMOVE_SEARCH_HISTORY_SUCCESS';
export const REMOVE_SEARCH_HISTORY_ERROR = 'NEW/REMOVE_SEARCH_HISTORY_ERROR';

export const GET_DEFAULT_COUNTRY_START = 'NEW/GET_DEFAULT_COUNTRY_START';
export const GET_DEFAULT_COUNTRY_SUCCESS = 'NEW/GET_DEFAULT_COUNTRY_SUCCESS';
export const GET_DEFAULT_COUNTRY_ERROR = 'NEW/GET_DEFAULT_COUNTRY_ERROR';

export const GET_COUNTRIES_START = 'NEW/GET_COUNTRIES_START';
export const GET_COUNTRIES_SUCCESS = 'NEW/GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_ERROR = 'NEW/GET_COUNTRIES_ERROR';

export const GET_DEFAULT_CURRENCY_START = 'NEW/GET_DEFAULT_CURRENCY_START';
export const GET_DEFAULT_CURRENCY_SUCCESS = 'NEW/GET_DEFAULT_CURRENCY_SUCCESS';
export const GET_DEFAULT_CURRENCY_ERROR = 'NEW/GET_DEFAULT_CURRENCY_ERROR';

export const GET_CURRENCIES_START = 'NEW/GET_CURRENCIES_START';
export const GET_CURRENCIES_SUCCESS = 'NEW/GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_ERROR = 'NEW/GET_CURRENCIES_ERROR';

export const GET_DEFAULT_LANGUAGE_START = 'NEW/GET_DEFAULT_LANGUAGE_START';
export const GET_DEFAULT_LANGUAGE_SUCCESS = 'NEW/GET_DEFAULT_LANGUAGE_SUCCESS';
export const GET_DEFAULT_LANGUAGE_ERROR = 'NEW/GET_DEFAULT_LANGUAGE_ERROR';

export const GET_LANGUAGES_START = 'NEW/GET_LANGUAGES_START';
export const GET_LANGUAGES_SUCCESS = 'NEW/GET_LANGUAGES_SUCCESS';
export const GET_LANGUAGES_ERROR = 'NEW/GET_LANGUAGES_ERROR';

export const SET_REGISTRATION_DEFAULTS = 'NEW/SET_REGISTRATION_DEFAULTS';

export const GET_DEFAULT_CONTENT_REGION_START = 'NEW/GET_DEFAULT_CONTENT_REGION_START';
export const GET_DEFAULT_CONTENT_REGION_SUCCESS = 'NEW/GET_DEFAULT_CONTENT_REGION_SUCCESS';
export const GET_DEFAULT_CONTENT_REGION_ERROR = 'NEW/GET_DEFAULT_CONTENT_REGION_ERROR';

export const GET_CONTENT_REGIONS_START = 'NEW/GET_CONTENT_REGIONS_START';
export const GET_CONTENT_REGIONS_SUCCESS = 'NEW/GET_CONTENT_REGIONS_SUCCESS';
export const GET_CONTENT_REGIONS_ERROR = 'NEW/GET_CONTENT_REGIONS_ERROR';

export const TRACK_TOPIC_EVENT_START = 'NEW/TRACK_TOPIC_EVENT_START';
export const TRACK_TOPIC_EVENT_SUCCESS = 'NEW/TRACK_TOPIC_EVENT_SUCCESS';
export const TRACK_TOPIC_EVENT_ERROR = 'NEW/TRACK_TOPIC_EVENT_ERROR';

export const TRACK_SPOTT_EVENT_START = 'NEW/TRACK_SPOTT_EVENT_START';
export const TRACK_SPOTT_EVENT_SUCCESS = 'NEW/TRACK_SPOTT_EVENT_SUCCESS';
export const TRACK_SPOTT_EVENT_ERROR = 'NEW/TRACK_SPOTT_EVENT_ERROR';

export const TRACK_IMPRESSION_EVENT_START = 'NEW/TRACK_IMPRESSION_EVENT_START';
export const TRACK_IMPRESSION_EVENT_SUCCESS = 'NEW/TRACK_IMPRESSION_EVENT_SUCCESS';
export const TRACK_IMPRESSION_EVENT_ERROR = 'NEW/TRACK_IMPRESSION_EVENT_ERROR';

export const TRACK_PRODUCT_EVENT_START = 'NEW/TRACK_PRODUCT_EVENT_START';
export const TRACK_PRODUCT_EVENT_SUCCESS = 'NEW/TRACK_PRODUCT_EVENT_SUCCESS';
export const TRACK_PRODUCT_EVENT_ERROR = 'NEW/TRACK_PRODUCT_EVENT_ERROR';
// Actions creators
// ////////////////

export const trackTopicView = makeApiActionCreator(api.trackTopicView, TRACK_TOPIC_EVENT_START, TRACK_TOPIC_EVENT_SUCCESS, TRACK_TOPIC_EVENT_ERROR);
export const trackSpottView = makeApiActionCreator(api.trackSpottView, TRACK_SPOTT_EVENT_START, TRACK_SPOTT_EVENT_SUCCESS, TRACK_SPOTT_EVENT_ERROR);
export const trackProductImpression = makeApiActionCreator(api.trackProductImpression, TRACK_IMPRESSION_EVENT_START, TRACK_IMPRESSION_EVENT_SUCCESS, TRACK_IMPRESSION_EVENT_ERROR);
export const trackProductView = makeApiActionCreator(api.trackProductView, TRACK_PRODUCT_EVENT_START, TRACK_PRODUCT_EVENT_SUCCESS, TRACK_PRODUCT_EVENT_ERROR);

export const loadTrendingTopics = makeApiActionCreator(api.getTrendingTopics, GET_TRENDING_TOPICS_START, GET_TRENDING_TOPICS_SUCCESS, GET_TRENDING_TOPICS_ERROR);

export const loadTrendingSeries = makeApiActionCreator(api.getTrendingSeries, GET_TRENDING_SERIES_START, GET_TRENDING_SERIES_SUCCESS, GET_TRENDING_SERIES_ERROR);

export const loadTopic = makeApiActionCreator(api.getTopic, GET_TOPIC_START, GET_TOPIC_SUCCESS, GET_TOPIC_ERROR);

export const loadTopicSpotts = makeApiActionCreator(api.getTopicSpotts, GET_TOPIC_SPOTTS_START, GET_TOPIC_SPOTTS_SUCCESS, GET_TOPIC_SPOTTS_ERROR);

export const loadTopicSpottsMore = makeApiActionCreator(api.getTopicSpotts, GET_TOPIC_SPOTTS_START, GET_TOPIC_SPOTTS_MORE_SUCCESS, GET_TOPIC_SPOTTS_ERROR);

export const loadTopicSeasons = makeApiActionCreator(api.getTvSeriesSeasons, GET_TOPIC_SEASONS_START, GET_TOPIC_SEASONS_SUCCESS, GET_TOPIC_SEASONS_ERROR);

export const loadTopicSeasonSpotts = makeApiActionCreator(api.getTvSeriesPosts, GET_TOPIC_SEASON_SPOTTS_START, GET_TOPIC_SEASON_SPOTTS_SUCCESS, GET_TOPIC_SEASON_SPOTTS_ERROR);

export const loadTopicSeasonSpottsMore = makeApiActionCreator(api.getTvSeriesPosts, GET_TOPIC_SEASON_SPOTTS_START, GET_TOPIC_SEASON_SPOTTS_MORE_SUCCESS, GET_TOPIC_SEASON_SPOTTS_ERROR);

export const loadTopicSeasonEpisodes = makeApiActionCreator(api.getTvSeriesSeasonEpisodes, GET_TOPIC_SEASON_EPISODES_START, GET_TOPIC_SEASON_EPISODES_SUCCESS, GET_TOPIC_SEASON_EPISODES_ERROR);

export const loadTopicSeasonEpisodeSpotts = makeApiActionCreator(api.getTvSeriesPosts, GET_TOPIC_SEASON_EPISODE_SPOTTS_START, GET_TOPIC_SEASON_EPISODE_SPOTTS_SUCCESS, GET_TOPIC_SEASON_EPISODE_SPOTTS_ERROR);

export const loadTopicSeasonEpisodeSpottsMore = makeApiActionCreator(api.getTvSeriesPosts, GET_TOPIC_SEASON_EPISODE_SPOTTS_START, GET_TOPIC_SEASON_EPISODE_SPOTTS_MORE_SUCCESS, GET_TOPIC_SEASON_EPISODE_SPOTTS_ERROR);

export const loadTopicRelated = makeApiActionCreator(api.getTopicRelated, GET_TOPIC_RELATED_START, GET_TOPIC_RELATED_SUCCESS, GET_TOPIC_RELATED_ERROR);

export const setTopicSubscriber = makeApiActionCreator(api.setTopicSubscriber, SET_TOPIC_SUBSCRIBER_START, SET_TOPIC_SUBSCRIBER_SUCCESS, SET_TOPIC_SUBSCRIBER_ERROR);

export const removeTopicSubscriber = makeApiActionCreator(api.removeTopicSubscriber, REMOVE_TOPIC_SUBSCRIBER_START, REMOVE_TOPIC_SUBSCRIBER_SUCCESS, REMOVE_TOPIC_SUBSCRIBER_ERROR);

export function loadTopicDetails ({ uuid, dc = '' }) {
  return async (dispatch, getState) => {
    try {
      const topicData = await dispatch(loadTopic({ uuid, dc }));
      if (topicData.sourceType === 'MEDIUM' && topicData.medium && topicData.medium.type === 'TV_SERIE') {
        dispatch(loadTopicSeasons({ uuid: topicData.medium.uuid }));
      }
      dispatch(loadTopicRelated({ uuid }));
    } catch (error) {
      throw error;
    }
  };
}

export const loadSpottsList = makeApiActionCreator(api.getSpottsList, GET_SPOTTS_LIST_START, GET_SPOTTS_LIST_SUCCESS, GET_SPOTTS_LIST_ERROR);

export const loadSpottsSubscribedList = makeApiActionCreator(api.getSpottsSubscribedList, GET_SPOTTS_SUBSCRIBED_LIST_START, GET_SPOTTS_SUBSCRIBED_LIST_SUCCESS, GET_SPOTTS_SUBSCRIBED_LIST_ERROR);

export const loadSpottsPromotedList = makeApiActionCreator(api.getSpottsPromotedList, GET_SPOTTS_PROMOTED_LIST_START, GET_SPOTTS_PROMOTED_LIST_SUCCESS, GET_SPOTTS_PROMOTED_LIST_ERROR);

export function loadSpottsListWrapper (isAuthenticated, { spottsPage, spottsSubscribedPage, spottsPromotedPage }) {
  return async (dispatch, getState) => {
    try {
      if (isAuthenticated) {
        const spottsSubscribed = spottsSubscribedPage === -1 ? null : await dispatch(loadSpottsSubscribedList(spottsSubscribedPage));
        if ((!spottsSubscribed || spottsSubscribed.meta.page + 1 >= spottsSubscribed.meta.pageCount) && spottsPage !== -1) {
          dispatch(loadSpottsList(spottsPage));
        }
      } else if (spottsPage !== -1) {
        dispatch(loadSpottsList(spottsPage));
      }
      if (spottsPromotedPage !== -1) {
        dispatch(loadSpottsPromotedList(spottsPromotedPage));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearSpottsList () {
  return async (dispatch, getState) => {
    dispatch({ type: CLEAR_SPOTTS_LIST });
  };
}

export const loadSpott = makeApiActionCreator(api.getSpott, GET_SPOTT_START, GET_SPOTT_SUCCESS, GET_SPOTT_ERROR);

export const loadSpottRelatedTopics = makeApiActionCreator(api.getSpottRelatedTopics, GET_SPOTT_RELATED_TOPICS_START, GET_SPOTT_RELATED_TOPICS_SUCCESS, GET_SPOTT_RELATED_TOPICS_ERROR);

export const loadSpottSimilar = makeApiActionCreator(api.getSpottSimilar, GET_SPOTT_SIMILAR_START, GET_SPOTT_SIMILAR_SUCCESS, GET_SPOTT_SIMILAR_ERROR);

export const loadSpottLovers = makeApiActionCreator(api.getSpottLovers, GET_SPOTT_LOVERS_START, GET_SPOTT_LOVERS_SUCCESS, GET_SPOTT_LOVERS_ERROR);

export const setSpottLover = makeApiActionCreator(api.setSpottLover, SET_SPOTT_LOVER_START, SET_SPOTT_LOVER_SUCCESS, SET_SPOTT_LOVER_ERROR);

export const removeSpottLover = makeApiActionCreator(api.removeSpottLover, REMOVE_SPOTT_LOVER_START, REMOVE_SPOTT_LOVER_SUCCESS, REMOVE_SPOTT_LOVER_ERROR);

export function loadSpottDetails ({ uuid, dc = '' }) {
  return async (dispatch, getState) => {
    try {
      const spott = spottSelector(getState(), { params: { spottId: uuid } });
      const result = spott.get('_status') === LOADED ? spott.toJS() : await dispatch(loadSpott({ uuid, dc }));
      spott.getIn([ 'relatedTopics', '_status' ], null) !== LOADED && dispatch(loadSpottRelatedTopics({ uuid }));
      spott.getIn([ 'similar', '_status' ], null) !== LOADED && dispatch(loadSpottSimilar({ uuid }));
      spott.getIn([ 'lovers', '_status' ], null) !== LOADED && dispatch(loadSpottLovers({ uuid }));
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function loadSpottCardDetails ({ uuid, dc = '' }) {
  return async (dispatch, getState) => {
    try {
      await dispatch(loadSpott({ uuid, dc }));
      dispatch(loadSpottLovers({ uuid }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const loadProduct = makeApiActionCreator(api.getProduct, GET_PRODUCT_START, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR);

export const loadProductSimilar = makeApiActionCreator(api.getProductSimilar, GET_PRODUCT_SIMILAR_START, GET_PRODUCT_SIMILAR_SUCCESS, GET_PRODUCT_SIMILAR_ERROR);

export const loadProductSpotts = makeApiActionCreator(api.getProductSpotts, GET_PRODUCT_SPOTTS_START, GET_PRODUCT_SPOTTS_SUCCESS, GET_PRODUCT_SPOTTS_ERROR);

export function loadProductDetails ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      await dispatch(loadProduct({ uuid }));
      dispatch(loadProductSimilar({ uuid }));
    } catch (error) {
      throw error;
    }
  };
}

export function loadSidebarProduct ({ uuid, relevance, dc = '' }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_SIDEBAR_PRODUCT_START, uuid });
      const product = productSelector(getState(), { params: { productId: uuid } });
      if (product.get('_status') !== LOADED || (!product.get('relevance') && relevance) || (dc && product.get('dc') !== dc)) {
        await dispatch(loadProduct({ uuid, relevance, dc }));
        await dispatch(loadProductSpotts({ uuid }));
        await dispatch(loadProductSimilar({ uuid }));
      }
      product.getIn([ 'spotts', '_status' ], null) !== LOADED && dispatch(loadProductSpotts({ uuid }));
      product.getIn([ 'similar', '_status' ], null) !== LOADED && dispatch(loadProductSimilar({ uuid }));
      dispatch(trackProductView({ uuid, dc }));
    } catch (error) {
      return dispatch({ type: LOAD_SIDEBAR_PRODUCT_ERROR, uuid, error });
    }
  };
}

export function loadSpottAndSidebarProduct ({ spottId, productId, spottDc = '' }) {
  return async (dispatch, getState) => {
    try {
      const spott = await dispatch(loadSpottDetails({ uuid: spottId, dc: spottDc }));
      const currentProductMarker = spott.productMarkers && spott.productMarkers.find((item) => item.product.uuid === productId);
      const firstMarker = spott.productMarkers && spott.productMarkers.length && spott.productMarkers[0];
      const relevance = currentProductMarker && currentProductMarker.relevance ? currentProductMarker.relevance : null;
      const dc = (currentProductMarker && getDetailsDcFromLinks(currentProductMarker.product.links)) ||
        firstMarker && firstMarker.product && getDetailsDcFromLinks(firstMarker.product.links) || null;
      dispatch(loadSidebarProduct({ uuid: productId, relevance, dc }));
    } catch (error) {
      throw error;
    }
  };
}

export function removeSidebarProduct ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REMOVE_SIDEBAR_PRODUCT_START, uuid });
    } catch (error) {
      return dispatch({ type: REMOVE_SIDEBAR_PRODUCT_ERROR, uuid, error });
    }
  };
}

export function clearSidebarProducts () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CLEAR_SIDEBAR_PRODUCTS_START });
    } catch (error) {
      return dispatch({ type: CLEAR_SIDEBAR_PRODUCTS_ERROR, error });
    }
  };
}

export const loadUserProfile = makeApiActionCreator(api.getUserProfile, GET_USER_PROFILE_START, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR);

export const updateUserProfile = makeApiActionCreator(api.updateUserProfile, UPDATE_USER_PROFILE_START, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_ERROR);

export function updateUserProfileWrapper ({ uuid, data }) {
  return async (dispatch, getState) => {
    try {
      const user = await dispatch(updateUserProfile({ uuid, data }));
      const session = JSON.parse(storage.getItem('session'));
      const body = {
        authenticationToken: session.authenticationToken,
        user: user.profile,
        initialValues: user.initialValues
      };
      storage.setItem('session', JSON.stringify(body));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const updateUserAvatar = makeApiActionCreator(api.updateUserAvatar, UPDATE_USER_AVATAR_START, UPDATE_USER_AVATAR_SUCCESS, UPDATE_USER_AVATAR_ERROR);

export const updateUserBackground = makeApiActionCreator(api.updateUserBackground, UPDATE_USER_BACKGROUND_START, UPDATE_USER_BACKGROUND_SUCCESS, UPDATE_USER_BACKGROUND_ERROR);

export const updateUserPassword = makeApiActionCreator(api.updateUserPassword, UPDATE_USER_PASSWORD_START, UPDATE_USER_PASSWORD_SUCCESS, UPDATE_USER_PASSWORD_ERROR);

export const resetUserPassword = makeApiActionCreator(api.resetUserPassword, RESET_USER_PASSWORD_START, RESET_USER_PASSWORD_SUCCESS, RESET_USER_PASSWORD_ERROR);

export const setUserFollowing = makeApiActionCreator(api.setUserFollowing, SET_USER_FOLLOWING_START, SET_USER_FOLLOWING_SUCCESS, SET_USER_FOLLOWING_ERROR);

export const removeUserFollowing = makeApiActionCreator(api.removeUserFollowing, REMOVE_USER_FOLLOWING_START, REMOVE_USER_FOLLOWING_SUCCESS, REMOVE_USER_FOLLOWING_ERROR);

export const loadUserFollowers = makeApiActionCreator(api.getUserFollowers, GET_USER_FOLLOWERS_START, GET_USER_FOLLOWERS_SUCCESS, GET_USER_FOLLOWERS_ERROR);

export const loadUserFollowersMore = makeApiActionCreator(api.getUserFollowers, GET_USER_FOLLOWERS_START, GET_USER_FOLLOWERS_MORE_SUCCESS, GET_USER_FOLLOWERS_ERROR);

export const loadUserFollowing = makeApiActionCreator(api.getUserFollowing, GET_USER_FOLLOWING_START, GET_USER_FOLLOWING_SUCCESS, GET_USER_FOLLOWING_ERROR);

export const loadUserSubscriptions = makeApiActionCreator(api.getUserSubscriptions, GET_USER_SUBSCRIPTIONS_START, GET_USER_SUBSCRIPTIONS_SUCCESS, GET_USER_SUBSCRIPTIONS_ERROR);

export const loadUserLovedPosts = makeApiActionCreator(api.getUserLovesPosts, GET_USER_LOVED_POSTS_START, GET_USER_LOVED_POSTS_SUCCESS, GET_USER_LOVED_POSTS_ERROR);

export const loadUserWishlist = makeApiActionCreator(api.getUserWishlist, GET_USER_WISHLIST_START, GET_USER_WISHLIST_SUCCESS, GET_USER_WISHLIST_ERROR);

export const addProductToWishlist = makeApiActionCreator(api.addProductToWishlist, ADD_PRODUCT_TO_WISHLIST_START, ADD_PRODUCT_TO_WISHLIST_SUCCESS, ADD_PRODUCT_TO_WISHLIST_ERROR);

export const removeProductFromWishlist = makeApiActionCreator(api.removeProductFromWishlist, REMOVE_PRODUCT_FROM_WISHLIST_START, REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS, REMOVE_PRODUCT_FROM_WISHLIST_ERROR);

export const loadSearchSuggestions = makeApiActionCreator(api.getSearchSuggestions, SEARCH_SUGGESTIONS_FETCH_START, SEARCH_SUGGESTIONS_FETCH_SUCCESS, SEARCH_SUGGESTIONS_FETCH_ERROR);

export function clearSearchSuggestions () {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_SUGGESTIONS_CLEAR });
  };
}

export const loadSearchHistory = makeApiActionCreator(api.getSearchHistory, GET_SEARCH_HISTORY_START, GET_SEARCH_HISTORY_SUCCESS, GET_SEARCH_HISTORY_ERROR);

export const removeSearchHistory = makeApiActionCreator(api.removeSearchHistory, REMOVE_SEARCH_HISTORY_START, REMOVE_SEARCH_HISTORY_SUCCESS, REMOVE_SEARCH_HISTORY_ERROR);

export const loadSearchPosts = makeApiActionCreator(api.getSearchPosts, GET_SEARCH_POSTS_START, GET_SEARCH_POSTS_SUCCESS, GET_SEARCH_POSTS_ERROR);

export const loadSearchPostsMore = makeApiActionCreator(api.getSearchPosts, GET_SEARCH_POSTS_MORE_START, GET_SEARCH_POSTS_MORE_SUCCESS, GET_SEARCH_POSTS_MORE_ERROR);

export const loadSearchPersons = makeApiActionCreator(api.getSearchPersons, GET_SEARCH_PERSONS_START, GET_SEARCH_PERSONS_SUCCESS, GET_SEARCH_PERSONS_ERROR);

export const loadSearchTopics = makeApiActionCreator(api.getSearchTopics, GET_SEARCH_TOPICS_START, GET_SEARCH_TOPICS_SUCCESS, GET_SEARCH_TOPICS_ERROR);

export const loadDefaultCountry = makeApiActionCreator(api.getDefaultCountry, GET_DEFAULT_COUNTRY_START, GET_DEFAULT_COUNTRY_SUCCESS, GET_DEFAULT_COUNTRY_ERROR);

export const loadCountries = makeApiActionCreator(api.getCountries, GET_COUNTRIES_START, GET_COUNTRIES_SUCCESS, GET_COUNTRIES_ERROR);

export const loadDefaultCurrency = makeApiActionCreator(api.getDefaultCurrency, GET_DEFAULT_CURRENCY_START, GET_DEFAULT_CURRENCY_SUCCESS, GET_DEFAULT_CURRENCY_ERROR);

export const loadDefaultLanguage = makeApiActionCreator(api.getDefaultLanguage, GET_DEFAULT_LANGUAGE_START, GET_DEFAULT_LANGUAGE_SUCCESS, GET_DEFAULT_LANGUAGE_ERROR);

export const loadCurrencies = makeApiActionCreator(api.getCurrencies, GET_CURRENCIES_START, GET_CURRENCIES_SUCCESS, GET_CURRENCIES_ERROR);

export const loadLanguages = makeApiActionCreator(api.getLanguages, GET_LANGUAGES_START, GET_LANGUAGES_SUCCESS, GET_LANGUAGES_ERROR);

export const loadDefaultContentRegion = makeApiActionCreator(api.getDefaultContentRegion, GET_DEFAULT_CONTENT_REGION_START, GET_DEFAULT_CONTENT_REGION_SUCCESS, GET_DEFAULT_CONTENT_REGION_SUCCESS);

export const loadContentRegions = makeApiActionCreator(api.getContentRegions, GET_CONTENT_REGIONS_START, GET_CONTENT_REGIONS_SUCCESS, GET_CONTENT_REGIONS_ERROR);

export function loadRegistrationFormDefaults () {
  return async (dispatch, getState) => {
    try {
      await dispatch(loadLanguages());
      // await dispatch(loadCountries());
      // const defaultCountry = await dispatch(loadDefaultCountry());
      const defaultLanguage = await dispatch(loadDefaultLanguage());
      return dispatch({
        data: {
          language: defaultLanguage ? defaultLanguage.uuid : null
        },
        type: SET_REGISTRATION_DEFAULTS
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function loadProfileFormValues () {
  return async (dispatch, getState) => {
    try {
      dispatch(loadLanguages());
      dispatch(loadCountries());
      dispatch(loadContentRegions());
      dispatch(loadCurrencies());
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const loadUserProfileAccount = makeApiActionCreator(api.getUserProfileAccount, GET_USER_PROFILE_ACCOUNT_START, GET_USER_PROFILE_ACCOUNT_SUCCESS, GET_USER_PROFILE_ACCOUNT_ERROR);

export function loadUserProfileAccountWrapper ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      const userProfile = await dispatch(loadUserProfileAccount({ uuid }));
      if (!userProfile.profile.currency) {
        const defaultCurrency = await dispatch(loadDefaultCurrency());
        defaultCurrency && (userProfile.initialValues.currencyForm = defaultCurrency.uuid);
      }
      if (!userProfile.profile.languages || !userProfile.profile.languages.length) {
        const defaultLanguage = await dispatch(loadDefaultLanguage());
        defaultLanguage && (userProfile.initialValues.languageForm = defaultLanguage.uuid);
      }
      if (!userProfile.profile.contentRegions || !userProfile.profile.contentRegions.length) {
        const defaultContentRegion = await dispatch(loadDefaultContentRegion());
        defaultContentRegion && (userProfile.initialValues.contentRegionsForm = [ `${defaultContentRegion.country.uuid}-${defaultContentRegion.language.uuid}` ]);
      }
      if (!userProfile.profile.shoppingCountries || !userProfile.profile.shoppingCountries.length) {
        const defaultShoppingCountry = await dispatch(loadDefaultCountry());
        defaultShoppingCountry && (userProfile.initialValues.shoppingCountriesForm = [ defaultShoppingCountry.uuid ]);
      }

      const session = storage.getItem('session');
      const sessionData = JSON.parse(session);
      sessionData.user = userProfile.profile;
      storage.setItem('session', JSON.stringify(sessionData));

      return dispatch({
        data: userProfile,
        type: SET_USER_PROFILE_ACCOUNT
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const loadUserActivityFeed = makeApiActionCreator(api.getUserActivityFeed, GET_USER_ACTIVITY_FEED_START, GET_USER_ACTIVITY_FEED_SUCCESS, GET_USER_ACTIVITY_FEED_SUCCESS);

export const REGISTER_USER_START = 'REGISTER_USER_START';
export function submit (values) {
  return async (dispatch, getState) => {
    try {
      const { firstName, gender, lastName, email, password, language, dayOfBirth, monthOfBirth, yearOfBirth } = values.toJS();
      dispatch({ type: REGISTER_USER_START });
      // Perform API call
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      const data = {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth: moment(`${yearOfBirth} ${parseInt(monthOfBirth, 10) + 1} ${dayOfBirth} 0:00 +0000`, 'YYYY M D HH:mm Z'),
        gender,
        languages: [ language ]
      };
      await usersApi.register(apiBaseUrl, data);
      // Automatically log in
      await dispatch(doLogin({ email, password }));
    } catch (error) {
      if (error.body.message === 'user already exists') {
        throw new SubmissionError({ _error: 'register.userAlreadyExist' });
      }
      throw new SubmissionError({ _error: error });
    }
  };
}

export const REGISTER_FACEBOOK_USER_START = 'REGISTER_FACEBOOK_USER_START';
export const REGISTER_FACEBOOK_USER_SUCCESS = 'REGISTER_FACEBOOK_USER_SUCCESS';
export const REGISTER_FACEBOOK_USER_ERROR = 'REGISTER_FACEBOOK_USER_ERROR';
export function registerWithFacebook ({ email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, gender }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, gender, type: REGISTER_FACEBOOK_USER_START });
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      await usersApi.registerWithFacebook(apiBaseUrl, { email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender: gender });
      await dispatch(doTryLoginFacebook({ facebookAccessToken }));
      return dispatch({ email, firstname, lastname, type: REGISTER_FACEBOOK_USER_SUCCESS });
    } catch (error) {
      if (error.body.message === 'user already exists') {
        try {
          await dispatch(doTryLoginFacebook({ facebookAccessToken }));
          return dispatch({ email, firstname, lastname, type: REGISTER_FACEBOOK_USER_SUCCESS });
        } catch (e) {
          if (e === 'login.invalidFacebook') {
            // User already exists and you can't login => You created an account without using Facebook.
            return dispatch({ error: 'register.facebookErrorAlreadyExists', email, firstname, lastname, type: REGISTER_FACEBOOK_USER_ERROR });
          }
          dispatch({ error: 'register.facebookError', email, firstname, lastname, type: REGISTER_FACEBOOK_USER_ERROR });
          throw e;
        }
      }
      dispatch({ error: '_common.unknown', email, firstname, lastname, dateOfBirth, gender, type: REGISTER_FACEBOOK_USER_ERROR });
      throw error;
    }
  };
}
