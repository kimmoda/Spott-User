import * as request from './request';
import { transformWishlist } from './transformers';

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
