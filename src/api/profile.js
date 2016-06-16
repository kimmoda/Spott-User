import * as request from './_request';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getUser (baseUrl, authenticationToken, { id }) {
  const { body } = await request.post(null, `${baseUrl}/v003/user/users/${id}`);
  const bodyProfile = body.user.profile;
  return {
    user: {
      avatar: bodyProfile.avatar ? { id: bodyProfile.avatar.uuid, url: bodyProfile.avatar.url } : null,
      dateOfBirth: bodyProfile.dateOfBirth,
      email: bodyProfile.email,
      firstname: bodyProfile.firstName,
      followerCount: bodyProfile.followerCount,
      followingCount: bodyProfile.followingCount,
      id: body.user.uuid,
      lastname: bodyProfile.lastName,
      picture: bodyProfile.picture ? { id: bodyProfile.picture.uuid, url: bodyProfile.picture.url } : null,
      tagline: bodyProfile.tagLine,
      username: body.user.userName
    }
  };
}

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlists (baseUrl, authenticationToken, { userId, page }) {
  const { body } = await request.post(null, `${baseUrl}/v003/user/users/${userId}?pageSize=2&page=${page}`);
  return {
    results: body.data.map((bodyWishlist) => {
      fixed: bodyWishlist.fixed,
      image: bodyWishlist.image ? { id: bodyWishlist.image.uuid, url: bodyWishlist.image.url } : null,
      name: bodyWishlist.name,
      id: bodyWishlist.uuid
    }),
    pageCount: body.pageCount
  };
}

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlistProducts (baseUrl, authenticationToken, { userId, wishlistId, page }) {
  const { body } = await request.post(null, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}/products?pageSize=2&page=${page}`);
  return {
    results: body.data.map((bodyWishlistProduct) => {
      buyUrl: bodyWishlistProduct.uuid,
      id: bodyWishlistProduct.uuid,
      image: bodyWishlist.image ? { id: bodyWishlist.image.uuid, url: bodyWishlist.image.url } : null,
      priceAmount: bodyWishlistProduct.price.amount,
      priceCurrency: bodyWishlistProduct.price.currency,
      name: bodyWishlistProduct.shortName
    }),
    pageCount: body.pageCount
  };
}
