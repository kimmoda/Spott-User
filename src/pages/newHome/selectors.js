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

export const productEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'newProducts' ]);

export const currentProductUuidSelector = (state) => state.getIn([ 'newHome', 'currentProduct', 'uuid' ]);
export const productSelector = createEntityByIdSelector(productEntitiesSelector, currentProductUuidSelector);

export const sidebarProductsListSelector = (state) => state.getIn([ 'newHome', 'sidebarProducts' ]);
export const sidebarProductsSelector = createStructuredSelector({
  sidebarProducts: createEntitiesByListSelector(sidebarProductsListSelector, productEntitiesSelector)
});

export const spottLoversSelector = (state) => state.getIn([ 'newHome', 'spottLovers' ]);

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
  spottLovers: spottLoversSelector,
  relatedTopics: trendingTopicsSelector,
  similarSpotts: spottsSelector,
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
