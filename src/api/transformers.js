import { COMMERCIAL, MOVIE, SERIES, SERIES_EPISODE } from '../data/mediumTypes';
import * as _ from 'lodash';
import moment from 'moment';

function stripDomain (url) {
  return url.substring(url.indexOf('/', 9));
}

export function transformUser ({ uuid, userName, profile }) {
  return {
    profile: {
      avatar: profile.avatar ? profile.avatar : null,
      dateOfBirth: profile.dateOfBirth,
      email: profile.email ? profile.email : null,
      firstName: profile.firstName,
      followerCount: profile.followerCount,
      followingCount: profile.followingCount,
      id: uuid,
      lastName: profile.lastName,
      picture: profile.picture ? profile.picture : null,
      tagline: profile.tagLine,
      username: userName,
      description: profile.description ? profile.description : null,
      gender: profile.gender ? profile.gender : null,
      languages: profile.languages ? profile.languages : null,
      currency: profile.currency ? profile.currency : null,
      shoppingCountries: profile.shoppingCountries ? profile.shoppingCountries : null,
      contentRegions: profile.contentRegions ? profile.contentRegions : null
    },
    initialValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email ? profile.email : null,
      description: profile.description ? profile.description : null,
      gender: profile.gender ? profile.gender : null,
      dayOfBirth: moment(profile.dateOfBirth).get('date'),
      monthOfBirth: moment(profile.dateOfBirth).get('month'),
      yearOfBirth: moment(profile.dateOfBirth).get('year'),
      currencyForm: profile.currency ? profile.currency.code : null,
      languageForm: profile.languages ? profile.languages[0].uuid : null,
      languagesForm: profile.languages ? profile.languages
        .map((item) => item.uuid)
        .filter((item) => item !== profile.languages[0].uuid) : null,
      shoppingCountriesForm: profile.shoppingCountries ? profile.shoppingCountries.map((item) => item.uuid) : null,
      contentRegionsForm: profile.contentRegions ? profile.contentRegions.map((item) => `${item.country.uuid}-${item.language.uuid}`) : null
    }
  };
}

/**
  * @returnExample
  * {
  *   available: true,
  *   buyUrl,
  *   id,
  *   image,
  *   price: { amount, currency },
  *   shareUrl,
  *   shortName,
  *   fullName
  * }
  */
export function transformListProduct ({ available, buyUrl, image, price, shortName, shareUrl, uuid: id, fullName }) {
  return {
    available,
    buyUrl,
    id,
    image: image && { id: image.uuid, url: image.url },
    price,
    shareUrl: stripDomain(shareUrl),
    shortName,
    fullName
  };
}

// no buyUrl, image
export function transformDetailedProduct ({ available, brand, description, longName, images, offerings, price, relevance, shortName, shareUrl, uuid: id, buyUrl }) {
  return {
    available,
    brand: brand && {
      name: brand.name,
      id: brand.uuid,
      logo: brand.logo && {
        url: brand.logo.url,
        id: brand.logo.uuid
      }
    },
    description,
    id,
    images: images && images.map((image) => ({ id: image.uuid, url: image.url })),
    longName,
    offerings: offerings && offerings.map((offer) => ({
      url: offer.buyUrl,
      price: offer.price,
      shop: offer.shop.name,
      universalBasketEnabled: offer.shop.universalBasketEnabled,
      directBuyUrl: offer.directBuyUrl,
      productUrl: offer.productUrl,
      productOfferingUuid: offer.uuid
    })),
    relevance,
    shareUrl: stripDomain(shareUrl),
    shortName,
    buyUrl
  };
}

export function transformCharacter ({ avatar, headerImage, name, shareUrl, subscribed, subscriberCount, uuid: id, appearances }) {
  return {
    avatarImage: avatar && { id: avatar.uuid, url: avatar.url },
    coverImage: headerImage && { id: headerImage.uuid, url: headerImage.url },
    id,
    name,
    shareUrl: stripDomain(shareUrl),
    subscribed,
    subscriberCount,
    appearances: appearances && appearances.data && appearances.data.length && {
      title: appearances.data[0].title,
      shareUrl: stripDomain(appearances.data[0].shareUrl)
    }
  };
}

export function transformWishlist (wishlist) {
  return {
    fixed: wishlist.fixed,
    id: wishlist.uuid,
    image: wishlist.image && { id: wishlist.image.uuid, url: wishlist.image.url },
    name: wishlist.name,
    publicWishlist: wishlist.public,
    containsProduct: wishlist.containsProduct
  };
}

/**
  * @returnExample
  * {
  *   id: '123'
  *   posterImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/cdf4a649-9ac2-4a1a-8e3f-9658d55eea47',
  *   profileImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/33f830fb-ac02-4e95-a074-c3ecfbd6db90',
  *   subscribed: true,
  *   subscriberCount: 111
  * }
  */
export function transformMedium ({ posterImage, profileImage, shareUrl, subscribed, subscriberCount, title, type, uuid: id }) {
  const medium = {
    id,
    posterImage: posterImage && { id: posterImage.uuid, url: posterImage.url },
    profileImage: profileImage && { id: profileImage.uuid, url: profileImage.url },
    shareUrl: stripDomain(shareUrl),
    title,
    type
  };
  // These fields can be undefined, and will be otherwise merged in the existing medium.
  if (subscribed !== undefined) {
    medium.subscribed = subscribed;
  }
  if (subscriberCount !== undefined) {
    medium.subscriberCount = subscriberCount;
  }
  return medium;
}

export function transformSeason ({ number, shareUrl, title, uuid: id }) {
  return {
    id,
    number,
    shareUrl: stripDomain(shareUrl),
    title
  };
}

export function transformEpisode ({ generatedTitle, number, posterImage, profileImage, season, shareUrl, title, uuid: id }) {
  return {
    id,
    generatedTitle,
    number,
    season: season && transformSeason(season),
    series: season && season.serie && transformMedium(season.serie),
    title,
    shareUrl: stripDomain(shareUrl),
    posterImage: posterImage && { id: posterImage.uuid, url: posterImage.url },
    profileImage: profileImage && { id: profileImage.uuid, url: profileImage.url }
  };
}

export function transformBrand ({ logo, name, uuid: id }) {
  return {
    id,
    logo: logo && { id: logo.uuid, url: logo.url },
    name
  };
}

export function transformCommercial ({ brand, shareUrl, title, type, uuid: id }) {
  return {
    brand: brand && transformBrand(brand),
    id,
    shareUrl: stripDomain(shareUrl),
    title,
    type
  };
}

function transformSceneProduct ({ image, position, price, relevance, shortName, uuid: id }) {
  return {
    id,
    image: image && { id: image.uuid, url: image.url },
    position,
    price,
    relevance,
    shortName
  };
}

export function transformScene (data) {
  const { characters, image, medium, products, saved, shareUrl, uuid: id } = data;
  const scene = {
    characters: ((characters && characters.data) || []).map(transformCharacter),
    id,
    image: image && { id: image.uuid, url: image.url },
    // TODO: add pagination, probably not needed because there are no more then 100 products on a scene...
    products: ((products && products.data) || []).map(transformSceneProduct),
    _summary: !(products && products.data) || !(characters && characters.data),
    saved,
    shareUrl: stripDomain(shareUrl)
  };
  if (medium) {
    switch (medium.type) {
      case COMMERCIAL:
        scene.commercial = transformCommercial(medium);
        scene.type = COMMERCIAL;
        break;
      case SERIES_EPISODE:
        scene.episode = transformEpisode(medium);
        scene.season = medium.season && transformSeason(medium.season);
        scene.series = medium.season && medium.season.serie && transformMedium(medium.season.serie);
        scene.type = SERIES;
        break;
      case MOVIE:
        scene.movie = transformMedium(medium);
        scene.type = MOVIE;
        break;
    }
  }
  return scene;
}

export function transformShare ({ body, image, title, url }) {
  return { description: body, image: image && { id: image.uuid, url: image.url }, title, url };
}

export function transformBroadcastChannel ({ logo, name, uuid: id }) {
  return { id, logo: logo && { id: logo.uuid, url: logo.url }, name };
}

export function transformTvGuideEntry ({ uuid: id, start, medium, medium: { season }, channel }) {
  return {
    start, id,
    medium: season && season.serie && transformMedium(season.serie) || transformMedium(medium),
    channel: transformBroadcastChannel(channel)
  };
}

export function transformSuggestions (data) {
  const types = {
    CHARACTER: 'CHARACTER',
    TV_SERIE: 'TV_SERIE',
    MOVIE: 'MOVIE'
  };

  const typeToTitle = {
    CHARACTER: 'CHARACTERS',
    TV_SERIE: 'TV SHOWS',
    MOVIE: 'MOVIES'
  };

  return _.chain(data)
    .groupBy('type')
    .pickBy((val, key) => {
      return types.hasOwnProperty(key);
    })
    .map((val, key) => {
      return {
        title: typeToTitle[key],
        suggestions: val.map((item) => (
          {
            title: item.suggestions[0].value,
            uuid: item.entity.uuid,
            imageUrl: key === types.CHARACTER
              ? item.entity.avatar && item.entity.avatar.url
              : item.entity.posterImage && item.entity.posterImage.url,
            shareUrl: stripDomain(item.entity.shareUrl),
            smallImage: key === types.CHARACTER
          }
        ))
      };
    })
    .value();
}

export function transformUbProduct (data) {
  const { body: { product } } = data;
  const { productUrl } = data;

  if (product.variants.options[0].child) {
    product.currentVariant = product.variants.options.filter((item) => item.child && item.child.options[0].url === productUrl)[0];
  } else {
    product.currentVariant = { child: { name: product.variants.options[0].name, options: product.variants.options } };
  }

  return product;
}

export function transformNewSuggestions (data) {
  function toUrlPart (type, uuid) {
    if (type === 'TV_SERIE' || type === 'CHARACTER' || type === 'MOVIE') {
      return `topic/MEDIUM%7C${uuid}`;
    }
    if (type === 'BRAND') {
      return `topic/BRAND%7C${uuid}`;
    }
    if (type === 'USER') {
      return `profile/${uuid}`;
    }
    if (type === 'ANNOTATED_POST') {
      return '';
    }
    return '';
  }

  return data.map((val) => {
    return {
      text: val.suggestions[0].value,
      urlPart: toUrlPart(val.type, val.entity.uuid)
    };
  });
}

export function transformSpottsList (data) {
  return {
    meta: {
      page: data.page,
      pageCount: data.pageCount,
      pageSize: data.pageSize,
      totalResultCount: data.totalResultCount
    },
    data: Object.assign({}, ...data.data.map((item) => { return { [item.uuid]: { ...item } }; }))
  };
}

export function transformPersonsList (data) {
  return {
    data: data.data.map((item) => item.user)
  };
}

export function transformFollowersList (data) {
  return {
    data: data.data.map((item) => {
      return {
        profile: {
          avatar: item.avatar,
          firstName: item.firstName,
          lastName: item.lastName,
          followingUser: item.following
        },
        uuid: item.user.uuid
      };
    })
  };
}
