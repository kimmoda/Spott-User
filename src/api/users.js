import * as request from './request';
import { transformUser } from './transformers';
/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getUser (baseUrl, authenticationToken, id) {
  const { body } = await request.get(null, `${baseUrl}/v003/user/users/${id}`);
  return transformUser(body);
}
