import { createSelector, createStructuredSelector } from 'reselect';
import {
  mediaEntitiesSelector, productsEntitiesSelector,
  popularProductsListSelector, recentlyAddedMediaListSelector, recentlyAddedToWishlistProductsListSelector,
  newScenesForYouListSelector, scenesEntitiesSelector,
  createEntitiesByListSelector, newEpisodesListSelector, mediumHasTopProductsSelector, popularMediaListSelector,
  tvGuideEntriesEntitiesSelector, tvGuideEntriesListSelector
} from '../../data/selector';
import { isAuthenticatedSelector } from '../app/selector';

const videosById = {
  'trailer-1': {
    duration: '0:44',
    fingerprintId: '3203417FFEC27DD3', // TODO: now it's family
    id: 'trailer-1',
    poster: require('./view/recentlyAdded/images/trailer-1-poster.png'),
    thumb: require('./view/recentlyAdded/images/trailer-1-thumb.png'),
    videoUrl: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_en/1080p/index.m3u8',
    title: {
      en: 'Fifty Shades Of Grey Trailer #1',
      fr: 'Fifty Shades Of Grey Trailer #1',
      nl: 'Fifty Shades Of Grey Trailer #1'
    }
  }
};

// Generate 12 videos
for (let i = 2; i <= 12; i++) {
  videosById[`trailer-${i}`] = {
    ...videosById['trailer-1'],
    id: `trailer-${i}`,
    title: {
      en: `Fifty Shades Of Grey Trailer #${i}`,
      fr: `Fifty Shades Of Grey Trailer #${i}`,
      nl: `Fifty Shades Of Grey Trailer #${i}`
    }
  };
}

const playlist = [];
for (let i = 1; i <= 12; i++) {
  playlist.push(videosById[`trailer-${i}`]);
}

const recentlyAddedMediaSelector = createEntitiesByListSelector(recentlyAddedMediaListSelector, mediaEntitiesSelector);
export const recentlyAddedSelector = createSelector(recentlyAddedMediaSelector, (recentlyAddedMedia) => {
  return {
    firstMedium: recentlyAddedMedia.getIn([ 'data', '0' ]),
    otherRecentlyAddedMedia: recentlyAddedMedia.set('data', recentlyAddedMedia.get('data').shift()),
    playlist,
    videosById
  };
});

export const tvGuideEntriesSelector = createStructuredSelector({
  tvGuideEntries: createEntitiesByListSelector(tvGuideEntriesListSelector, tvGuideEntriesEntitiesSelector)
});

export const recentlyAddedToWishlistSelector = createStructuredSelector({
  recentlyAddedToWishlistProducts: createEntitiesByListSelector(recentlyAddedToWishlistProductsListSelector, productsEntitiesSelector)
});

export const scenesForYouSelector = createStructuredSelector({
  scenes: createEntitiesByListSelector(newScenesForYouListSelector, scenesEntitiesSelector)
});

export const newEpisodesSelector = createStructuredSelector({
  episodes: createEntitiesByListSelector(newEpisodesListSelector, mediaEntitiesSelector),
  mediumHasTopProducts: mediumHasTopProductsSelector,
  products: productsEntitiesSelector
});

export const popularProductsSelector = createStructuredSelector({
  popularProducts: createEntitiesByListSelector(popularProductsListSelector, productsEntitiesSelector)
});

export const topSellingProductsSelector = createStructuredSelector({
  media: createEntitiesByListSelector(popularMediaListSelector, mediaEntitiesSelector),
  mediumHasTopProducts: mediumHasTopProductsSelector,
  products: productsEntitiesSelector
});

export const homeSelector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
});

const searchSuggestionsSelector = (state) => state.getIn([ 'home', 'searchSuggestions' ]);
export const searchSelector = createStructuredSelector({
  searchSuggestions: searchSuggestionsSelector
});
