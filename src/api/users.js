import { get, post } from './request';
import { transformUser } from './transformers';

/**
 * @throws NetworkError
 * @throws NotFoundError
 * @throws UnexpectedError
 */
export async function getUser (baseUrl, authenticationToken, locale, { userId }) {
  const { body } = await get(authenticationToken, locale, `${baseUrl}/v003/user/users/${userId}`);
  return transformUser(body);
}

export function register (baseUrl, { email, firstname, lastname, password }) {
  return post(null, null, `${baseUrl}/v003/user/users/register/username`, { email, firstName: firstname, lastName: lastname, password });
}

export function registerWithFacebook (baseUrl, { email, firstname, lastname, facebookAccessToken, facebookId }) {
  return post(null, null, `${baseUrl}/v003/user/users/register/facebook`, { email, firstName: firstname, lastName: lastname, facebookAccessToken, facebookId });
}
