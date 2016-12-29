import * as request from './request';
import { transformWishlist } from './transformers';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getWishlistsOfUser (baseUrl, authenticationToken, locale, { page, userId, productUuid }) {
  let data;
  let pageCount;
  if (page === 0 && !productUuid) {
    // Fetch first page, include the default list at the front
    const { body } = await request.get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists?pageSize=500&page=${page}`);
    data = body.data;
    data.unshift(body.defaultList);
    pageCount = body.pageCount;
  } else if (page === 0 && productUuid) {
    const { body } = await request.get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists?pageSize=500&page=${page}&productUuid=${productUuid}`);
    data = body.data;
    data.unshift(body.defaultList);
    pageCount = body.pageCount;
  } else {
    const { body } = await request.get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists?pageSize=500&page=${page}&includeDefaultList=false`);
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
export async function getWishlistOfUser (baseUrl, authenticationToken, locale, { userId, wishlistId }) {
  // Fetch first page, include the default list at the front
  const { body } = await request.get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}`);
  // Transform items
  return transformWishlist(body);
}

export async function addWishlistProduct (baseUrl, authenticationToken, locale, { userId, wishlistId, productUuid }) {
  await request.post(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}/products`, { uuid: productUuid });
}

export async function removeWishlistProduct (baseUrl, authenticationToken, locale, { userId, wishlistId, productUuid }) {
  await request.del(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}/products/${productUuid}`);
}

export async function createWishlist (baseUrl, authenticationToken, locale, { userId, wishlistName }) {
  try {
    await request.post(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists`, { name: wishlistName });
  } catch (error) {
    if (error.body.message === 'list already exists') {
      throw 'profile.wishlistButton.alreadyExist';
    }
    throw '_common.unknown';
  }
}

export async function updateWishlist (baseUrl, authenticationToken, locale, { userId, data }) {
  try {
    await request.post(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists`, data);
  } catch (error) {
    if (error.body.message === 'list already exists') {
      throw 'profile.wishlistButton.alreadyExist';
    }
    throw '_common.unknown';
  }
}

export async function removeWishlist (baseUrl, authenticationToken, locale, { userId, wishlistId }) {
  try {
    await request.del(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}/wishlists/${wishlistId}`);
  } catch (error) {
    throw '_common.unknown';
  }
}
