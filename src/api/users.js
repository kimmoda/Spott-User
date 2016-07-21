import * as request from './request';
import { transformUser } from './transformers';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getUser (baseUrl, authenticationToken, locale, { userId }) {
  const { body } = await request.get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}`);
  return transformUser(body);
}
