import * as request from '../../api/_request';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getProduct (baseUrl, authenticationToken, id) {
  const { body } = await request.get(null, `${baseUrl}/v003/product/products/${id}`);
  return {
    description: body.description,
    images: body.images,
    longName: body.longName,
    shareUrl: body.shareUrl,
    shortName: body.shortName
  };
}
