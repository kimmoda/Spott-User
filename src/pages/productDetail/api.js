import * as request from '../../request';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getProduct (baseUrl, authenticationToken, id) {
  const { body } = await request.get(null, `${baseUrl}/v003/product/products/${id}`);
  const { body: { data } } = await request.get(null, `${baseUrl}/v003/product/products/${id}/similar`);
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
