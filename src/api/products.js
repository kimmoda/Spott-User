import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformProduct } from './transformers';

/**
 * GET /user/users/:userId/wishlists/searches/products
 * Get recently added products of my wishlists. First 50.
 * @param {string} authenticationToken
 * @param {string} seriesId
 * @returnExample
 * {
 *   id: '123'
 *   posterImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/cdf4a649-9ac2-4a1a-8e3f-9658d55eea47',
 *   profileImage: 'https://spott-ios-rest-tst.appiness.mobi:443/spott/rest/v003/image/images/33f830fb-ac02-4e95-a074-c3ecfbd6db90',
 *   subscribed: true,
 *   subscriberCount: 111
 * }
 * @throws NotFoundError
 * @throws UnauthorizedError
 * @throws UnexpectedError
 */
export async function getRecentlyAddedToWishlist (baseUrl, authenticationToken, { userId }) {
  try {
    // TODO: currently 'Get all products that appear in a whishlist' https://appiness.atlassian.net/browse/SPOTBACK-440
    // TODO: must become 'Recently added to my wish list section' https://appiness.atlassian.net/browse/SWEWBSITE-43
    const { body: { data } } = await get(authenticationToken, `${baseUrl}/v003/user/users/${userId}/wishlists/searches/products?pageSize=50`);
    return data.map(transformProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('user', error);
    }
    throw new UnexpectedError(error);
  }
}

// Returns only first 50 products.
export async function getPopularProducts (baseUrl, authenticationToken) {
  try {
    // TODO: currently 'Get the top products based on the number of times they were tagged' https://appiness.atlassian.net/browse/APPTCORE-253
    // TODO: must become 'Get the top selling products for a medium' https://appiness.atlassian.net/browse/APPTCORE-252
    const { body: { data } } = await get(authenticationToken, `${baseUrl}/v003/product/products/searches/popular?pageSize=50`);
    return data.map(transformProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
    }
    throw new UnexpectedError(error);
  }
}
