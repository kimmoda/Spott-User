import { createSelector, createStructuredSelector } from 'reselect';
import {
  mediaEntitiesSelector, productsEntitiesSelector,
  popularProductsListSelector, recentlyAddedMediaListSelector, recentlyAddedToWishlistProductsListSelector,
  newScenesForYouListSelector, scenesEntitiesSelector,
  createEntitiesByListSelector, newEpisodesListSelector, mediumHasTopProductsSelector, popularMediaListSelector,
  tvGuideEntriesEntitiesSelector, tvGuideEntriesListSelector
} from '../../data/selector';
import { isAuthenticatedSelector } from '../app/selector';

const description = {
  en: 'You can now discover all clothing and items worn in \'Fifty Shades Darker\' in Spott. Go to www.spott.it and buy the perfect Valentine\'s gift in one click.',
  fr: 'Découvrez maintenant tous les tenues et articles portés dans \'Cinquante nuances plus sombres\' dans Spott. Allez à www.spott.it et achetez le cadeau Saint Valentin parfait en un seul clic!',
  nl: 'Vind alle outfits en items uit \'Fifty Shades Darker\' in Spott. Laat je inspireren op www.spott.it en ontdek met één klik het perfecte Valentijnscadeau.'
};
const title = {
  en: 'Discover all the clothes and items from \'Fifty Shades Darker\' in Spott!',
  fr: 'Découvrez tous les vêtements et articles de \'Cinquante nuances plus sombres\' dans Spott!',
  nl: 'Ontdek alle kleding en items uit \'Fifty Shades Darker\' in Spott!'
};

const videosById = {
  'trailer-1': {
    description,
    duration: '02:10',
    fingerprintId: '855EB3628BD33309',
    id: 'trailer-1',
    label: {
      en: 'Fifty Shades Darker - Trailer #1',
      fr: 'Cinquante Nuances Plus Sombres - Bande Annonce #1',
      nl: 'Vijftig Tinten Donkerder - Trailer #1'
    },
    medium: {
      shareUrl: {
        en: '/en/movie/fifty-shades-darker-trailer/346f5d81-7927-4666-a906-6fcdff032c06/overview',
        fr: '/fr/movie/cinquante-nuances-plus-sombres-bande-annonce/346f5d81-7927-4666-a906-6fcdff032c06/overview',
        nl: '/nl/movie/vijftig-tinten-donkerder-trailer/346f5d81-7927-4666-a906-6fcdff032c06/overview'
      }
    },
    poster: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-1-poster.jpg'
    },
    social: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-1-social.jpg'
    },
    thumb: {
      dimension: {
        height: 80,
        width: 140
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-1-thumb.jpg'
    },
    title,
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_01_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_01_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_01_nl/1080p/index.m3u8'
    }
  },
  'trailer-2': {
    description,
    duration: '02:11',
    fingerprintId: '34BEED95DACBD5D5',
    id: 'trailer-2',
    medium: {
      shareUrl: {
        en: '/en/movie/fifty-shades-darker-trailer-2/17bce3b1-2f72-4bcf-9403-664eb6069ce2/overview',
        fr: '/fr/movie/cinquante-nuances-plus-sombres-bande-annonce-2/17bce3b1-2f72-4bcf-9403-664eb6069ce2/overview',
        nl: '/nl/movie/vijftig-tinten-donkerder-trailer-2/17bce3b1-2f72-4bcf-9403-664eb6069ce2/overview'
      }
    },
    poster: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-2-poster.jpg'
    },
    social: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-2-social.jpg'
    },
    thumb: {
      dimension: {
        height: 80,
        width: 140
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-2-thumb.jpg'
    },
    label: {
      en: 'Fifty Shades Darker - Trailer #2',
      fr: 'Cinquante Nuances Plus Sombres - Bande Annonce #2',
      nl: 'Vijftig Tinten Donkerder - Trailer #2'
    },
    title,
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_02_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_02_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_dark_02_nl/1080p/index.m3u8'
    }
  },
  'trailer-3': {
    description,
    duration: '02:17',
    fingerprintId: 'E56F4B707FD38E15',
    id: 'trailer-3',
    medium: {
      shareUrl: {
        en: '/en/movie/fifty-shades-of-grey-trailer-1/d70af452-f070-45fe-92b0-a49a25452a11/overview',
        fr: '/fr/movie/cinquante-nuances-de-grey-bande-annonce-1/d70af452-f070-45fe-92b0-a49a25452a11/overview',
        nl: '/nl/movie/vijftig-tinten-grijs-trailer-1/d70af452-f070-45fe-92b0-a49a25452a11/overview'
      }
    },
    poster: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-3-poster.jpg'
    },
    social: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-3-social.jpg'
    },
    thumb: {
      dimension: {
        height: 80,
        width: 140
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-3-thumb.jpg'
    },
    label: {
      en: 'Fifty Shades Of Grey - Trailer #1',
      fr: 'Cinquante Nuances de Grey - Bande Annonce #1',
      nl: 'Vijftig Tinten Grijs - Trailer #1'
    },
    title,
    videoUrl: {
      en: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_en/1080p/index.m3u8',
      fr: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_fr/1080p/index.m3u8',
      nl: 'https://appinessmedia.blob.core.windows.net/spott/50_grey_01_nl/1080p/index.m3u8'
    }
  },
  'trailer-4': {
    description,
    duration: '02:24',
    fingerprintId: 'E3221922A61BAC2A',
    id: 'trailer-4',
    medium: {
      shareUrl: {
        en: '/en/movie/fifty-shades-of-grey-trailer-2/3581f7c9-2236-46ee-89b7-b3094702727b/overview',
        fr: '/fr/movie/cinquante-nuances-de-grey-bande-annonce-2/3581f7c9-2236-46ee-89b7-b3094702727b/overview',
        nl: '/nl/movie/vijftig-tinten-grijs-trailer-2/3581f7c9-2236-46ee-89b7-b3094702727b/overview'
      }
    },
    poster: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-4-poster.jpg'
    },
    social: {
      dimension: {
        height: 720,
        width: 1280
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-4-social.jpg'
    },
    thumb: {
      dimension: {
        height: 80,
        width: 140
      },
      url: 'https://s3-eu-west-1.amazonaws.com/appiness-spott-prd/shades/trailer-4-thumb.jpg'
    },
    label: {
      en: 'Fifty Shades Of Grey Trailer #2',
      fr: 'Cinquante Nuances de Grey - Bande Annonce #2',
      nl: 'Vijftig Tinten Grijs - Trailer #2'
    },
    title,
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
