import { createStructuredSelector, createSelector } from 'reselect';
import { createEntityByIdSelector, createEntitiesByListSelector } from '../../data/selector';
import { List } from 'immutable';
import * as _ from 'lodash';

export const authenticationTokenSelector = (state) => state.getIn([ 'app', 'authentication', 'authenticationToken' ]);
export const currentUserAvatarSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'avatar' ]);
export const currentUserFirstnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'firstname' ]);
export const currentUserLastnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'lastname' ]);
export const currentUserIdSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'id' ]);
export const currentUserProfileSelector = (state) => state.getIn([ 'app', 'authentication', 'user' ]);
export const currentUserProfileInitialValuesSelector = (state) => state.getIn([ 'app', 'authentication', 'initialValues' ]);

export const trendingTopicsSelector = (state) => state.getIn([ 'newHome', 'trendingTopics' ]);
export const trendingSeriesSelector = (state) => state.getIn([ 'newHome', 'trendingSeries' ]);
export const topicSelector = (state) => state.getIn([ 'newHome', 'topic' ]);
export const topicSeasonsSelector = (state) => state.getIn([ 'newHome', 'topicSeasons' ]);
export const topicSeasonSpottsSelector = (state) => state.getIn([ 'newHome', 'topicSeasonSpotts' ]);
export const topicSeasonEpisodesSelector = (state) => state.getIn([ 'newHome', 'topicSeasonEpisodes' ]);
export const topicSeasonEpisodeSpottsSelector = (state) => state.getIn([ 'newHome', 'topicSeasonEpisodeSpotts' ]);
export const topicSpottsSelector = (state) => state.getIn([ 'newHome', 'topicSpotts' ]);
export const topicRelatedSelector = (state) => state.getIn([ 'newHome', 'topicRelated' ]);
export const topicSubscribersSelector = (state) => state.getIn([ 'newHome', 'topicSubscribers' ]);

export const spottsSelector = (state) => state.getIn([ 'newHome', 'spotts' ]);
export const spottsSubscribedSelector = (state) => state.getIn([ 'newHome', 'spottsSubscribed' ]);
export const spottsPromotedSelector = (state) => state.getIn([ 'newHome', 'spottsPromoted' ]);

export const currentSpottUuidSelector = (state, props) => props.params && props.params.spottId;
export const spottEntitiesSelector = (state) => state.getIn([ 'newHome', 'spottsDetails' ]);
export const spottSelector = createEntityByIdSelector(spottEntitiesSelector, currentSpottUuidSelector);

const spottCardUuidSelector = (state, props) => props.spottId;
const spottCardSelector = createEntityByIdSelector(spottEntitiesSelector, spottCardUuidSelector);
export const spottCardDetailsSelector = createStructuredSelector({
  spottDetails: spottCardSelector,
  userId: currentUserIdSelector
});

export const productEntitiesSelector = (state) => state.getIn([ 'newHome', 'productsDetails' ]);

export const currentProductUuidSelector = (state, props) => props.params && props.params.productId;
export const productSelector = createEntityByIdSelector(productEntitiesSelector, currentProductUuidSelector);

export const sidebarProductsListSelector = (state) => state.getIn([ 'newHome', 'sidebarProducts' ]);
export const sidebarProductsSelector = createStructuredSelector({
  sidebarProducts: createEntitiesByListSelector(sidebarProductsListSelector, productEntitiesSelector)
});

const step = 5;
const homeSpottsSelector = createSelector(
  spottsSelector,
  (spotts) => {
    return spotts.get('data', new List()).toArray();
  }
);

const homeSpottsSubscribedSelector = createSelector(
  spottsSubscribedSelector,
  (spottsSubscribed) => {
    return spottsSubscribed.get('data', new List()).toArray();
  }
);

const homeSpottsJoinedSelector = createSelector(
  homeSpottsSubscribedSelector,
  homeSpottsSelector,
  (spottsSubscribed = [], spotts = []) => {
    return [ ..._.defaultTo(spottsSubscribed, []), ..._.defaultTo(spotts, []) ];
  }
);

const homeSpottsPromotedSelector = createSelector(
  spottsPromotedSelector,
  (spottsPromoted) => {
    return spottsPromoted.get('data', new List()).toArray();
  }
);

const homeFeedSelector = createSelector(
  homeSpottsJoinedSelector,
  homeSpottsPromotedSelector,
  (homeSpotts, homeSpottsPromoted) => {
    const advCount = Math.floor(homeSpotts.length / step);
    const preparedSpotts = homeSpotts
      .map((item, idx) => ((idx + 1) % step) === 0 ? [ item, null ] : [ item ])
      .reduce((acc, item) => [ ...acc, ...item ], []);
    const preparedPromoted = homeSpottsPromoted
      .filter((_item, idx) => idx < advCount)
      .reduce((acc, item) => [ ...acc, ...(new Array(step)).fill(null), item ], []);
    return _.zip(preparedSpotts, preparedPromoted).map((item) => item[0] || item[1]).filter((item) => item);
  }
);

export const newHomeSelector = createStructuredSelector({
  isAuthenticated: authenticationTokenSelector,
  trendingSeries: trendingSeriesSelector,
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
  topicSeasons: topicSeasonsSelector,
  topicSeasonSpotts: topicSeasonSpottsSelector,
  topicSeasonEpisodes: topicSeasonEpisodesSelector,
  topicSeasonEpisodeSpotts: topicSeasonEpisodeSpottsSelector,
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
  initialValues: currentUserProfileInitialValuesSelector,
  subscriptions: userSubscriptionsSelector
});

const systemLanguagesSelector = (state) => state.getIn([ 'newHome', 'systemLanguages' ]);
const systemCountriesSelector = (state) => state.getIn([ 'newHome', 'systemCountries' ]);
const systemCurrenciesSelector = (state) => state.getIn([ 'newHome', 'systemCurrencies' ]);
const systemContentRegionsSelector = (state) => state.getIn([ 'newHome', 'systemContentRegions' ]);

export const userAccountDetailsSelector = createStructuredSelector({
  userId: currentUserIdSelector,
  currentUserProfile: currentUserProfileSelector,
  initialValues: currentUserProfileInitialValuesSelector,
  token: authenticationTokenSelector,
  systemLanguages: systemLanguagesSelector,
  systemCountries: systemCountriesSelector,
  systemCurrencies: systemCurrenciesSelector,
  systemContentRegions: systemContentRegionsSelector
});

export const usersEntitiesSelector = (state) => state.getIn([ 'newHome', 'users' ]);
const userProfileUuidSelector = (state, props) => props.params && props.params.userId || props.userId;
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

export const registrationFormSelector = createStructuredSelector({
  systemLanguages: systemLanguagesSelector,
  systemCountries: systemCountriesSelector,
  initialValues: registrationFormDefaultsSelector,
  facebookError: registrationFacebookErrorSelector,
  facebookIsLoading: registrationFacebookIsLoadingSelector
});

export const usersLikesModalSelector = createStructuredSelector({
  currentUserId: currentUserIdSelector
});

export const spottUsersSelector = createStructuredSelector({
  isAuthenticated: authenticationTokenSelector,
  currentUserProfile: currentUserProfileSelector
});
