import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformProduct } from './transformers';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getProduct (baseUrl, authenticationToken, id) {
  const { body } = await get(null, `${baseUrl}/v003/product/products/${id}`);
  const { body: { data } } = await get(null, `${baseUrl}/v003/product/products/${id}/similar`);
  return {
    description: body.description,
    images: body.images ? body.images.map((image) => ({ id: image.uuid, url: image.url })) : null,
    longName: body.longName,
    shareUrl: body.shareUrl,
    shortName: body.shortName,
    brand: body.brand ? { name: body.brand.name,
                          id: body.brand.uuid,
                          logo: body.brand.logo ? { url: body.brand.logo.url,
                                                    id: body.brand.logo.uuid } : null } : null,
    offerings: body.offerings ? body.offerings.map((offer) => ({
      url: offer.buyUrl,
      price: { currency: offer.price.currency, amount: offer.price.amount },
      shop: offer.shop.name })) : null,
    selectedImage: body.images ? body.images[0].url : null,
    similarProducts: data.map((product) => ({
      shortName: product.shortName,
      image: product.image ? product.image.url : null,
      price: { currency: product.price.currency, amount: product.price.amount },
      id: product.uuid }
    ))
  };
}

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
