import { createStructuredSelector } from 'reselect';

export const trendingTopicsSelector = (state) => state.getIn([ 'newHome', 'trendingTopics' ]);
export const topicSelector = (state) => state.getIn([ 'newHome', 'topic' ]);
export const topicSpottsSelector = (state) => state.getIn([ 'newHome', 'topicSpotts' ]);
export const topicRelatedSelector = (state) => state.getIn([ 'newHome', 'topicRelated' ]);
export const topicSubscribersSelector = (state) => state.getIn([ 'newHome', 'topicSubscribers' ]);

export const spottsSelector = (state) => state.getIn([ 'newHome', 'spotts' ]);
export const spottSelector = (state) => state.getIn([ 'newHome', 'spott' ]);
export const spottLoversSelector = (state) => state.getIn([ 'newHome', 'spottLovers' ]);

export const newHomeSelector = createStructuredSelector({
  trendingTopics: trendingTopicsSelector,
  spotts: spottsSelector
});

export const spottDetailsSelector = createStructuredSelector({
  spott: spottSelector,
  spottLovers: spottLoversSelector,
  relatedTopics: trendingTopicsSelector,
  similarSpotts: spottsSelector
});

export const topicDetailsSelector = createStructuredSelector({
  topic: topicSelector,
  topicSpotts: topicSpottsSelector,
  topicRelated: topicRelatedSelector,
  topicSubscribers: topicSubscribersSelector
});
