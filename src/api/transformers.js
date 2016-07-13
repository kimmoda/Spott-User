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
export function transformProduct ({ available, buyUrl, image, price, shortName, shareUrl, uuid: id }) {
  return {
    available,
    buyUrl,
    id,
    image: image && image.url,
    price,
    shareUrl,
    shortName
  };
}

export function transformCharacter ({ avatar, name, uuid: id }) {
  return { characterImage: avatar && avatar.url, id, name };
}

export function transformWishlist (wishlist) {
  return {
    fixed: wishlist.fixed,
    image: wishlist.image ? { id: wishlist.image.uuid, url: wishlist.image.url } : null,
    name: wishlist.name,
    id: wishlist.uuid
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
export function transformSeries ({ posterImage, profileImage, subscribed, subscriberCount, title, uuid: id }) {
  return {
    id,
    posterImage: posterImage && posterImage.url,
    profileImage: profileImage && profileImage.url,
    subscribed,
    subscriberCount,
    title
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
