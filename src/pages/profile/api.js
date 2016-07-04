import * as request from '../../api/request';

function transformWishlist (wishlist) {
  return {
    fixed: wishlist.fixed,
    image: wishlist.image ? { id: wishlist.image.uuid, url: wishlist.image.url } : null,
    name: wishlist.name,
    id: wishlist.uuid
  };
}

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getUser (baseUrl, authenticationToken, id) {
  const { body } = await request.get(null, `${baseUrl}/v003/user/users/${id}`);
  const bodyProfile = body.profile;
  return {
    avatar: bodyProfile.avatar ? { id: bodyProfile.avatar.uuid, url: bodyProfile.avatar.url } : null,
    dateOfBirth: bodyProfile.dateOfBirth,
    email: bodyProfile.email,
    firstname: bodyProfile.firstName,
    followerCount: bodyProfile.followerCount,
    followingCount: bodyProfile.followingCount,
    id: body.uuid,
    lastname: bodyProfile.lastName,
    picture: bodyProfile.picture ? { id: bodyProfile.picture.uuid, url: bodyProfile.picture.url } : null,
    tagline: bodyProfile.tagLine,
    username: body.userName
  };
}

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlistsOfUser (baseUrl, authenticationToken, userId, page) {
  let data;
  let pageCount;
  if (page === 0) {
    // Fetch first page, include the default list at the front
    const { body } = await request.get(null, `${baseUrl}/v003/user/users/${userId}/wishlists?pageSize=500&page=${page}`);
    data = body.data;
    data.unshift(body.defaultList);
    pageCount = body.pageCount;
  } else {
    const { body } = await request.get(null, `${baseUrl}/v003/user/users/${userId}/wishlists?pageSize=500&page=${page}&includeDefaultList=false`);
    data = body.data;
    pageCount = body.pageCount;
  }
  // Transform items
  return {
    data: data.map(transformWishlist),
    pageCount
  };
}

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlistOfUser (baseUrl, authenticationToken, userId, wishlistId) {
  // Fetch first page, include the default list at the front
  const { body } = await request.get(null, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}`);
  // Transform items
  return transformWishlist(body);
}

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlistProducts (baseUrl, authenticationToken, userId, wishlistId, page) {
  const { body: { data, pageCount } } = await request.get(null, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}/products?pageSize=500&page=${page}`);
  // Transform items
  return {
    data: data.map((bodyWishlistProduct) => ({
      buyUrl: bodyWishlistProduct.buyUrl,
      id: bodyWishlistProduct.uuid,
      image: bodyWishlistProduct.image ? { id: bodyWishlistProduct.image.uuid, url: bodyWishlistProduct.image.url } : null,
      priceAmount: bodyWishlistProduct.price.amount,
      priceCurrency: bodyWishlistProduct.price.currency,
      name: bodyWishlistProduct.shortName
    })),
    pageCount
  };
}
