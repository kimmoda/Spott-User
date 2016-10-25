import { COMMERCIAL, MOVIE, SERIES, SERIES_EPISODE } from '../data/mediumTypes';

function stripDomain (url) {
  return url.substring(url.indexOf('/', 9));
}

export function transformUser ({ uuid, userName, profile }) {
  return {
    avatar: profile.avatar ? { id: profile.avatar.uuid, url: profile.avatar.url } : null,
    dateOfBirth: profile.dateOfBirth,
    email: profile.email,
    firstname: profile.firstName,
    followerCount: profile.followerCount,
    followingCount: profile.followingCount,
    id: uuid,
    lastname: profile.lastName,
    picture: profile.picture ? { id: profile.picture.uuid, url: profile.picture.url } : null,
    tagline: profile.tagLine,
    username: userName
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
  *   shortName
  * }
  */
export function transformListProduct ({ available, buyUrl, image, price, shortName, shareUrl, uuid: id }) {
  return {
    available,
    buyUrl,
    id,
    image: image && { id: image.uuid, url: image.url },
    price,
    shareUrl: stripDomain(shareUrl),
    shortName
  };
}

// no buyUrl, image
export function transformDetailedProduct ({ available, brand, description, longName, images, offerings, price, relevance, shortName, shareUrl, uuid: id }) {
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
      shop: offer.shop.name
    })),
    relevance,
    shareUrl: stripDomain(shareUrl),
    shortName
  };
}

export function transformCharacter ({ avatar, headerImage, name, shareUrl, subscribed, subscriberCount, uuid: id }) {
  return {
    avatarImage: avatar && { id: avatar.uuid, url: avatar.url },
    coverImage: headerImage && { id: headerImage.uuid, url: headerImage.url },
    id,
    name,
    shareUrl: stripDomain(shareUrl),
    subscribed,
    subscriberCount
  };
}

export function transformWishlist (wishlist) {
  return {
    fixed: wishlist.fixed,
    id: wishlist.uuid,
    image: wishlist.image && { id: wishlist.image.uuid, url: wishlist.image.url },
    name: wishlist.name,
    publicWishlist: wishlist.public
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
  return {
    id,
    posterImage: posterImage && { id: posterImage.uuid, url: posterImage.url },
    profileImage: profileImage && { id: profileImage.uuid, url: profileImage.url },
    shareUrl: stripDomain(shareUrl),
    subscribed,
    subscriberCount,
    title,
    type
  };
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
