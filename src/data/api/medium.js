import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformProduct } from './transformers';

/**
 * GET /media/media/:mediumId/products
 * Get medium products.
 * @param {string} authenticationToken
 * @param {string} mediumId
 * @param {number} page
 * @returnExample see transformProduct
 * @throws NotFoundError
 * @throws UnauthorizedError
 * @throws UnexpectedError
 */
export async function getMediumProducts (baseUrl, authenticationToken, { mediumId, page = 0 }) {
  try {
    const { body: { data } } = await get(authenticationToken, `${baseUrl}/v003/media/media/${mediumId}/products?pageSize=50&page=${page}`);
    return data.map(transformProduct);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('medium', error);
    }
    throw new UnexpectedError(error);
  }
}

function transformCharacter ({ avatar, name, uuid: id }) {
  return { characterImage: avatar && avatar.url, id, name };
}

export async function getMediumCharacters (baseUrl, authenticationToken, { mediumId, page = 0 }) {
  try {
    const { body: { data } } = await get(authenticationToken, `${baseUrl}/v003/media/media/${mediumId}/cast?pageSize=50&page=${page}`);
    return data.map(transformCharacter);
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('medium', error);
    }
    throw new UnexpectedError(error);
  }
}
