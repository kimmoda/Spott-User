import { makeApiActionCreator } from '../../data/actions';
import * as api from '../../api/new';
import { getLocalStorage } from '../../utils';

const storage = getLocalStorage();

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

export const SET_TOPIC_SUBSCRIBER_START = 'NEW/SET_TOPIC_SUBSCRIBER_START';
export const SET_TOPIC_SUBSCRIBER_SUCCESS = 'NEW/SET_TOPIC_SUBSCRIBER_SUCCESS';
export const SET_TOPIC_SUBSCRIBER_ERROR = 'NEW/SET_TOPIC_SUBSCRIBER_ERROR';

export const REMOVE_TOPIC_SUBSCRIBER_START = 'NEW/REMPVE_TOPIC_SUBSCRIBER_START';
export const REMOVE_TOPIC_SUBSCRIBER_SUCCESS = 'NEW/REMOVE_TOPIC_SUBSCRIBER_SUCCESS';
export const REMOVE_TOPIC_SUBSCRIBER_ERROR = 'NEW/REMOVE_TOPIC_SUBSCRIBER_ERROR';

export const GET_SPOTTS_LIST_START = 'NEW/GET_SPOTTS_LIST_START';
export const GET_SPOTTS_LIST_SUCCESS = 'NEW/GET_SPOTTS_LIST_SUCCESS';
export const GET_SPOTTS_LIST_ERROR = 'NEW/GET_SPOTTS_LIST_ERROR';

export const LOAD_SPOTT_START = 'NEW/LOAD_SPOTT_START';
export const LOAD_SPOTT_ERROR = 'NEW/LOAD_SPOTT_ERROR';

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

export const LOAD_PRODUCT_START = 'NEW/LOAD_PRODUCT_START';
export const LOAD_PRODUCT_ERROR = 'NEW/LOAD_PRODUCT_ERROR';

export const GET_PRODUCT_START = 'NEW/GET_PRODUCT_START';
export const GET_PRODUCT_SUCCESS = 'NEW/GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'NEW/GET_PRODUCT_ERROR';

export const GET_PRODUCT_SIMILAR_START = 'NEW/GET_PRODUCT_SIMILAR_START';
export const GET_PRODUCT_SIMILAR_SUCCESS = 'NEW/GET_PRODUCT_SIMILAR_SUCCESS';
export const GET_PRODUCT_SIMILAR_ERROR = 'NEW/GET_PRODUCT_SIMILAR_ERROR';

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

export const UPDATE_USER_PROFILE_START = 'NEW/UPDATE_USER_PROFILE_START';
export const UPDATE_USER_PROFILE_SUCCESS = 'NEW/UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_ERROR = 'NEW/UPDATE_USER_PROFILE_ERROR';

export const UPDATE_USER_AVATAR_START = 'NEW/UPDATE_USER_AVATAR_START';
export const UPDATE_USER_AVATAR_SUCCESS = 'NEW/UPDATE_USER_AVATAR_SUCCESS';
export const UPDATE_USER_AVATAR_ERROR = 'NEW/UPDATE_USER_AVATAR_ERROR';

export const UPDATE_USER_BACKGROUND_START = 'NEW/UPDATE_USER_BACKGROUND_START';
export const UPDATE_USER_BACKGROUND_SUCCESS = 'NEW/UPDATE_USER_BACKGROUND_SUCCESS';
export const UPDATE_USER_BACKGROUND_ERROR = 'NEW/UPDATE_USER_BACKGROUND_ERROR';

export const GET_USER_LOVED_POSTS_START = 'NEW/GET_USER_LOVED_POSTS_START';
export const GET_USER_LOVED_POSTS_SUCCESS = 'NEW/GET_USER_LOVED_POSTS_SUCCESS';
export const GET_USER_LOVED_POSTS_ERROR = 'NEW/GET_USER_LOVED_POSTS_ERROR';

export const GET_USER_WISHLIST_START = 'NEW/GET_USER_WISHLIST_START';
export const GET_USER_WISHLIST_SUCCESS = 'NEW/GET_USER_WISHLIST_SUCCESS';
export const GET_USER_WISHLIST_ERROR = 'NEW/GET_USER_WISHLIST_ERROR';

export const ADD_PRODUCT_TO_WISHLIST_START = 'NEW/ADD_PRODUCT_TO_WISHLIST_START';
export const ADD_PRODUCT_TO_WISHLIST_SUCCESS = 'NEW/ADD_PRODUCT_TO_WISHLIST_SUCCESS';
export const ADD_PRODUCT_TO_WISHLIST_ERROR = 'NEW/ADD_PRODUCT_TO_WISHLIST_ERROR';

export const REMOVE_PRODUCT_FROM_WISHLIST_START = 'NEW/REMOVE_PRODUCT_FROM_WISHLIST_START';
export const REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS = 'NEW/REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS';
export const REMOVE_PRODUCT_FROM_WISHLIST_ERROR = 'NEW/REMOVE_PRODUCT_FROM_TO_WISHLIST_ERROR';

// Actions creators
// ////////////////

export const loadTrendingTopics = makeApiActionCreator(api.getTrendingTopics, GET_TRENDING_TOPICS_START, GET_TRENDING_TOPICS_SUCCESS, GET_TRENDING_TOPICS_ERROR);

export const loadTopic = makeApiActionCreator(api.getTopic, GET_TOPIC_START, GET_TOPIC_SUCCESS, GET_TOPIC_ERROR);

export const loadTopicSpotts = makeApiActionCreator(api.getTopicSpotts, GET_TOPIC_SPOTTS_START, GET_TOPIC_SPOTTS_SUCCESS, GET_TOPIC_SPOTTS_ERROR);

export const loadTopicRelated = makeApiActionCreator(api.getTopicRelated, GET_TOPIC_RELATED_START, GET_TOPIC_RELATED_SUCCESS, GET_TOPIC_RELATED_ERROR);

export const setTopicSubscriber = makeApiActionCreator(api.setTopicSubscriber, SET_TOPIC_SUBSCRIBER_START, SET_TOPIC_SUBSCRIBER_SUCCESS, SET_TOPIC_SUBSCRIBER_ERROR);

export const removeTopicSubscriber = makeApiActionCreator(api.removeTopicSubscriber, REMOVE_TOPIC_SUBSCRIBER_START, REMOVE_TOPIC_SUBSCRIBER_SUCCESS, REMOVE_TOPIC_SUBSCRIBER_ERROR);

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

export const loadSpottRelatedTopics = makeApiActionCreator(api.getSpottRelatedTopics, GET_SPOTT_RELATED_TOPICS_START, GET_SPOTT_RELATED_TOPICS_SUCCESS, GET_SPOTT_RELATED_TOPICS_ERROR);

export const loadSpottSimilar = makeApiActionCreator(api.getSpottSimilar, GET_SPOTT_SIMILAR_START, GET_SPOTT_SIMILAR_SUCCESS, GET_SPOTT_SIMILAR_ERROR);

export const loadSpottLovers = makeApiActionCreator(api.getSpottLovers, GET_SPOTT_LOVERS_START, GET_SPOTT_LOVERS_SUCCESS, GET_SPOTT_LOVERS_ERROR);

export const setSpottLover = makeApiActionCreator(api.setSpottLover, SET_SPOTT_LOVER_START, SET_SPOTT_LOVER_SUCCESS, SET_SPOTT_LOVER_ERROR);

export const removeSpottLover = makeApiActionCreator(api.removeSpottLover, REMOVE_SPOTT_LOVER_START, REMOVE_SPOTT_LOVER_SUCCESS, REMOVE_SPOTT_LOVER_ERROR);

export function loadSpottDetails ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_SPOTT_START, uuid });
      await dispatch(loadSpott({ uuid }));
      dispatch(loadSpottRelatedTopics({ uuid }));
      dispatch(loadSpottSimilar({ uuid }));
      dispatch(loadSpottLovers({ uuid }));
    } catch (error) {
      return dispatch({ type: LOAD_SPOTT_ERROR, uuid, error });
    }
  };
}

export function loadSpottCardDetails ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      await dispatch(loadSpott({ uuid }));
      dispatch(loadSpottLovers({ uuid }));
    } catch (error) {
      return dispatch({ type: LOAD_SPOTT_ERROR, uuid, error });
    }
  };
}

export const loadProduct = makeApiActionCreator(api.getProduct, GET_PRODUCT_START, GET_PRODUCT_SUCCESS, GET_PRODUCT_ERROR);

export const loadProductSimilar = makeApiActionCreator(api.getProductSimilar, GET_PRODUCT_SIMILAR_START, GET_PRODUCT_SIMILAR_SUCCESS, GET_PRODUCT_SIMILAR_ERROR);

export function loadProductDetails ({ uuid }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_PRODUCT_START, uuid });
      await dispatch(loadProduct({ uuid }));
      dispatch(loadProductSimilar({ uuid }));
    } catch (error) {
      return dispatch({ type: LOAD_PRODUCT_ERROR, uuid, error });
    }
  };
}

export function loadSidebarProduct ({ uuid, relevance }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_SIDEBAR_PRODUCT_START, uuid });
      await dispatch(loadProduct({ uuid, relevance }));
      dispatch(loadProductSimilar({ uuid }));
    } catch (error) {
      return dispatch({ type: LOAD_SIDEBAR_PRODUCT_ERROR, uuid, error });
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
        user
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

export const loadUserSubscriptions = makeApiActionCreator(api.getUserSubscriptions, GET_USER_SUBSCRIPTIONS_START, GET_USER_SUBSCRIPTIONS_SUCCESS, GET_USER_SUBSCRIPTIONS_ERROR);

export const loadUserLovedPosts = makeApiActionCreator(api.getUserLovesPosts, GET_USER_LOVED_POSTS_START, GET_USER_LOVED_POSTS_SUCCESS, GET_USER_LOVED_POSTS_ERROR);

export const loadUserWishlist = makeApiActionCreator(api.getUserWishlist, GET_USER_WISHLIST_START, GET_USER_WISHLIST_SUCCESS, GET_USER_WISHLIST_ERROR);

export const addProductToWishlist = makeApiActionCreator(api.addProductToWishlist, ADD_PRODUCT_TO_WISHLIST_START, ADD_PRODUCT_TO_WISHLIST_SUCCESS, ADD_PRODUCT_TO_WISHLIST_ERROR);

export const removeProductFromWishlist = makeApiActionCreator(api.removeProductFromWishlist, REMOVE_PRODUCT_FROM_WISHLIST_START, REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS, REMOVE_PRODUCT_FROM_WISHLIST_ERROR);