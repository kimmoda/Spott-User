import { createStructuredSelector, createSelector } from 'reselect';
import { createEntityByIdSelector, createEntitiesByListSelector } from '../../data/selector';
import * as _ from 'lodash';

export const authenticationTokenSelector = (state) => state.getIn([ 'app', 'authentication', 'authenticationToken' ]);
export const currentUserAvatarSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'avatar' ]);
export const currentUserFirstnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'firstname' ]);
export const currentUserLastnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'lastname' ]);
export const currentUserIdSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'id' ]);
export const currentUserProfileSelector = (state) => state.getIn([ 'app', 'authentication', 'user' ]);

export const trendingTopicsSelector = (state) => state.getIn([ 'newHome', 'trendingTopics' ]);
export const topicSelector = (state) => state.getIn([ 'newHome', 'topic' ]);
export const topicSpottsSelector = (state) => state.getIn([ 'newHome', 'topicSpotts' ]);
export const topicRelatedSelector = (state) => state.getIn([ 'newHome', 'topicRelated' ]);
export const topicSubscribersSelector = (state) => state.getIn([ 'newHome', 'topicSubscribers' ]);

export const spottsSelector = (state) => state.getIn([ 'newHome', 'spotts' ]);
export const spottsSubscribedSelector = (state) => state.getIn([ 'newHome', 'spottsSubscribed' ]);
export const spottsPromotedSelector = (state) => state.getIn([ 'newHome', 'spottsPromoted' ]);

export const currentSpottUuidSelector = (state) => state.getIn([ 'newHome', 'currentSpott', 'uuid' ]);
export const spottEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'spotts' ]);
export const spottSelector = createEntityByIdSelector(spottEntitiesSelector, currentSpottUuidSelector);

const spottCardUuidSelector = (state, props) => props.spottId;
const spottCardSelector = createEntityByIdSelector(spottEntitiesSelector, spottCardUuidSelector);
export const spottCardDetailsSelector = createStructuredSelector({
  spottDetails: spottCardSelector,
  userId: currentUserIdSelector
});

export const productEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'newProducts' ]);

export const currentProductUuidSelector = (state) => state.getIn([ 'newHome', 'currentProduct', 'uuid' ]);
export const productSelector = createEntityByIdSelector(productEntitiesSelector, currentProductUuidSelector);

export const sidebarProductsListSelector = (state) => state.getIn([ 'newHome', 'sidebarProducts' ]);
export const sidebarProductsSelector = createStructuredSelector({
  sidebarProducts: createEntitiesByListSelector(sidebarProductsListSelector, productEntitiesSelector)
});

const step = 2;
const homeSpottsSelector = createSelector(
  spottsSelector,
  (spotts) => {
    return spotts.get('data') && spotts.get('data')
      .map((item, idx) => ((idx + 1) % step) === 0 ? [ item, null ] : [ item ])
      .reduce((acc, item) => [ ...acc, ...item ], []);
  }
);

/*
const homeSpottsSubscribedSelector = createSelector(
  spottsSubscribedSelector,
  (spottsSubscribed) => {
    return spottsSubscribed.get('data') && spottsSubscribed.get('data')
        .map((item, idx) => ((idx + 1) % step) === 0 ? [ item, null ] : [ item ])
        .reduce((acc, item) => [ ...acc, ...item ], []);
  }
);
*/

const homeSpottsPromotedSelector = createSelector(
  spottsPromotedSelector,
  (spottsPromoted) => {
    return spottsPromoted.get('data') && spottsPromoted.get('data')
      .reduce((acc, item) => [ ...acc, ...(new Array(step)).fill(null), item ], []);
  }
);

const homeFeedSelector = createSelector(
  homeSpottsSelector,
  homeSpottsPromotedSelector,
  (homeSpotts, homeSpottsPromoted) => {
    return _.zip(homeSpotts, homeSpottsPromoted).map((item) => item[0] || item[1]).filter((item) => item);
  }
);

export const newHomeSelector = createStructuredSelector({
  isAuthenticated: authenticationTokenSelector,
  trendingTopics: trendingTopicsSelector,
  spotts: spottsSelector,
  spottsSubscribed: spottsSubscribedSelector,
  spottsPromoted: spottsPromotedSelector,
  feedSpotts: homeFeedSelector
});

const searchSuggestionsSelector = (state) => state.getIn([ 'newHome', 'searchSuggestions' ]);

const searchHistorySelector = (state) => state.getIn([ 'newHome', 'searchHistory' ]);

export const newHeaderSelector = createStructuredSelector({
  trendingTopics: trendingTopicsSelector,
  isAuthenticated: authenticationTokenSelector,
  currentUserAvatar: currentUserAvatarSelector,
  currentUserFirstname: currentUserFirstnameSelector,
  currentUserLastname: currentUserLastnameSelector,
  currentUserId: currentUserIdSelector,
  searchSuggestions: searchSuggestionsSelector,
  searchHistory: searchHistorySelector
});

export const spottDetailsSelector = createStructuredSelector({
  spott: spottSelector,
  sidebarProducts: createEntitiesByListSelector(sidebarProductsListSelector, productEntitiesSelector),
  currentUserId: currentUserIdSelector
});

export const topicDetailsSelector = createStructuredSelector({
  topic: topicSelector,
  topicSpotts: topicSpottsSelector,
  topicRelated: topicRelatedSelector,
  topicSubscribers: topicSubscribersSelector,
  currentUserId: currentUserIdSelector
});

export const productDetailsSelector = createStructuredSelector({
  product: productSelector
});

export const userSubscriptionsSelector = (state) => state.getIn([ 'newHome', 'profile', 'subscriptions' ]);

export const userSettingsDetailsSelector = createStructuredSelector({
  userId: currentUserIdSelector,
  currentUserProfile: currentUserProfileSelector,
  initialValues: currentUserProfileSelector,
  subscriptions: userSubscriptionsSelector
});

export const userAccountDetailsSelector = createStructuredSelector({
  userId: currentUserIdSelector,
  currentUserProfile: currentUserProfileSelector,
  initialValues: currentUserProfileSelector,
  token: authenticationTokenSelector
});

export const usersEntitiesSelector = (state) => state.getIn([ 'newHome', 'users' ]);
const userProfileUuidSelector = (state, props) => props.params.userId;
const userProfileSelector = createEntityByIdSelector(usersEntitiesSelector, userProfileUuidSelector);

export const userProfileDetailsSelector = createStructuredSelector({
  userProfile: userProfileSelector,
  currentUserId: currentUserIdSelector
});

export const sidebarSelector = createStructuredSelector({
  isAuthenticated: authenticationTokenSelector,
  currentUserId: currentUserIdSelector
});

const searchTopicsSelector = (state) => state.getIn([ 'newHome', 'searchResults', 'topics' ]);
const searchPostsSelector = (state) => state.getIn([ 'newHome', 'searchResults', 'posts' ]);
const searchPersonsSelector = (state) => state.getIn([ 'newHome', 'searchResults', 'persons' ]);

export const searchResultsSelector = createStructuredSelector({
  currentUserId: currentUserIdSelector,
  topics: searchTopicsSelector,
  posts: searchPostsSelector,
  persons: searchPersonsSelector
});

export const registrationFacebookErrorSelector = (state) => state.getIn([ 'app', 'registration', 'error' ]);
export const registrationFacebookIsLoadingSelector = (state) => state.getIn([ 'app', 'registration', 'isLoading' ]);
const registrationFormDefaultsSelector = (state) => state.getIn([ 'newHome', 'registrationFormDefaults' ]);
const systemLanguagesSelector = (state) => state.getIn([ 'newHome', 'systemLanguages' ]);
const systemCountriesSelector = (state) => state.getIn([ 'newHome', 'systemCountries' ]);

export const registrationFormSelector = createStructuredSelector({
  systemLanguages: systemLanguagesSelector,
  systemCountries: systemCountriesSelector,
  initialValues: registrationFormDefaultsSelector,
  facebookError: registrationFacebookErrorSelector,
  facebookIsLoading: registrationFacebookIsLoadingSelector
});
