import { createStructuredSelector } from 'reselect';
import { createEntityByIdSelector, createEntitiesByListSelector } from '../../data/selector';

export const authenticationTokenSelector = (state) => state.getIn([ 'app', 'authentication', 'authenticationToken' ]);
export const currentUserAvatarSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'avatar' ]);
export const currentUserFirstnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'firstname' ]);
export const currentUserLastnameSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'lastname' ]);
export const currentUserIdSelector = (state) => state.getIn([ 'app', 'authentication', 'user', 'id' ]);

export const trendingTopicsSelector = (state) => state.getIn([ 'newHome', 'trendingTopics' ]);
export const topicSelector = (state) => state.getIn([ 'newHome', 'topic' ]);
export const topicSpottsSelector = (state) => state.getIn([ 'newHome', 'topicSpotts' ]);
export const topicRelatedSelector = (state) => state.getIn([ 'newHome', 'topicRelated' ]);
export const topicSubscribersSelector = (state) => state.getIn([ 'newHome', 'topicSubscribers' ]);

export const spottsSelector = (state) => state.getIn([ 'newHome', 'spotts' ]);

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

export const newHomeSelector = createStructuredSelector({
  trendingTopics: trendingTopicsSelector,
  spotts: spottsSelector
});

export const newHeaderSelector = createStructuredSelector({
  trendingTopics: trendingTopicsSelector,
  isAuthenticated: authenticationTokenSelector,
  currentUserAvatar: currentUserAvatarSelector,
  currentUserFirstname: currentUserFirstnameSelector,
  currentUserLastname: currentUserLastnameSelector,
  currentUserId: currentUserIdSelector
});

export const spottDetailsSelector = createStructuredSelector({
  spott: spottSelector,
  sidebarProducts: createEntitiesByListSelector(sidebarProductsListSelector, productEntitiesSelector)
});

export const topicDetailsSelector = createStructuredSelector({
  topic: topicSelector,
  topicSpotts: topicSpottsSelector,
  topicRelated: topicRelatedSelector,
  topicSubscribers: topicSubscribersSelector
});

export const productDetailsSelector = createStructuredSelector({
  product: productSelector
});

export const userSubscriptionsSelector = (state) => state.getIn([ 'newHome', 'profile', 'subscriptions' ]);

export const userSettingsDetailsSelector = createStructuredSelector({
  userId: currentUserIdSelector,
  subscriptions: userSubscriptionsSelector
});

export const usersEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'users' ]);
const userProfileUuidSelector = (state, props) => props.params.userId;
const userProfileSelector = createEntityByIdSelector(usersEntitiesSelector, userProfileUuidSelector);

export const userProfileDetailsSelector = createStructuredSelector({
  userProfile: userProfileSelector
});

export const sidebarSelector = createStructuredSelector({
  isAuthenticated: authenticationTokenSelector,
  currentUserId: currentUserIdSelector
});
