import { createStructuredSelector } from 'reselect';
import { mediaEntitiesSelector, recentlyAddedMediaListSelector, createEntitiesByListSelector } from '../../data/selector';

export const recentlyAddedSelector = createStructuredSelector({
  recentlyAddedMedia: createEntitiesByListSelector(recentlyAddedMediaListSelector, mediaEntitiesSelector)
});
