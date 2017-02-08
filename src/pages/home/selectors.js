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
    description: {
      en: 'Fifty Shades Darker Trailer #1',
      fr: 'Fifty Shades Darker Trailer #1',
      nl: 'Fifty Shades Darker Trailer #1'
    },
    duration: '01:44', // TODO
    fingerprintId: '855EB3628BD33309',
    id: 'trailer-1',
    poster: require('./view/recentlyAdded/images/trailer-1-poster.png'),
    thumb: require('./view/recentlyAdded/images/trailer-1-thumb.png'),
    title: {
      en: 'Fifty Shades Darker Trailer #1',
      fr: 'Fifty Shades Darker Trailer #1',
      nl: 'Fifty Shades Darker Trailer #1'
    },
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_01_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_01_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_01_nl/1080p/index.m3u8'
    }
  },
  'trailer-2': {
    description: {
      en: 'Fifty Shades Darker Trailer #2',
      fr: 'Fifty Shades Darker Trailer #2',
      nl: 'Fifty Shades Darker Trailer #2'
    },
    duration: '01:44', // TODO
    fingerprintId: '34BEED95DACBD5D5',
    id: 'trailer-2',
    poster: require('./view/recentlyAdded/images/trailer-1-poster.png'),
    thumb: require('./view/recentlyAdded/images/trailer-1-thumb.png'),
    title: {
      en: 'Fifty Shades Darker Trailer #2',
      fr: 'Fifty Shades Darker Trailer #2',
      nl: 'Fifty Shades Darker Trailer #2'
    },
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_02_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_02_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_02_nl/1080p/index.m3u8'
    }
  },
  'trailer-3': {
    description: {
      en: 'Fifty Shades Of Grey Trailer #2',
      fr: 'Fifty Shades Of Grey Trailer #2',
      nl: 'Fifty Shades Of Grey Trailer #2'
    },
    duration: '01:44', // TODO
    fingerprintId: 'E56F4B707FD38E15',
    id: 'trailer-3',
    poster: require('./view/recentlyAdded/images/trailer-1-poster.png'),
    thumb: require('./view/recentlyAdded/images/trailer-1-thumb.png'),
    title: {
      en: 'Fifty Shades Of Grey Trailer #2',
      fr: 'Fifty Shades Of Grey Trailer #2',
      nl: 'Fifty Shades Of Grey Trailer #2'
    },
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_nl/1080p/index.m3u8'
    }
  },
  'trailer-4': {
    description: {
      en: 'Fifty Shades Of Grey Trailer #2',
      fr: 'Fifty Shades Of Grey Trailer #2',
      nl: 'Fifty Shades Of Grey Trailer #2'
    },
    duration: '01:44', // TODO
    fingerprintId: 'E3221922A61BAC2A',
    id: 'trailer-4',
    poster: require('./view/recentlyAdded/images/trailer-1-poster.png'),
    thumb: require('./view/recentlyAdded/images/trailer-1-thumb.png'),
    title: {
      en: 'Fifty Shades Of Grey Trailer #2',
      fr: 'Fifty Shades Of Grey Trailer #2',
      nl: 'Fifty Shades Of Grey Trailer #2'
    },
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_02_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_02_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_02_nl/1080p/index.m3u8'
    }
  }
};

const playlist = [];
for (let i = 1; i <= 4; i++) {
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
