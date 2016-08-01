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
export function transformDetailedProduct ({ available, brand, description, longName, images, offerings, price, shortName, shareUrl, uuid: id }) {
  return {
    available,
    description,
    id,
    images: images && images.map((image) => ({ id: image.uuid, url: image.url })),
    longName,
    shareUrl: stripDomain(shareUrl),
    shortName,
    brand: brand && {
      name: brand.name,
      id: brand.uuid,
      logo: brand.logo && {
        url: brand.logo.url,
        id: brand.logo.uuid
      }
    },
    offerings: offerings && offerings.map((offer) => ({
      url: offer.buyUrl,
      price: offer.price,
      shop: offer.shop.name
    }))
  };
}

export function transformCharacter ({ avatar, name, uuid: id }) {
  return {
    id,
    image: avatar && { id: avatar.uuid, url: avatar.url },
    name
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
export function transformMedium ({ posterImage, profileImage, subscribed, subscriberCount, title, type, uuid: id }) {
  return {
    id,
    posterImage: posterImage && { id: posterImage.uuid, url: posterImage.url },
    profileImage: profileImage && { id: profileImage.uuid, url: profileImage.url },
    subscribed,
    subscriberCount,
    title,
    type
  };
}

export function transformSeason ({ title, uuid: id }) {
  return {
    id,
    title
  };
}

export function transformEpisode ({ title, uuid: id }) {
  return {
    id,
    title
  };
}
