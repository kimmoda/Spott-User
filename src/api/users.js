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

export function register (baseUrl, { email, firstname, lastname, password, dateOfBirth, gender }) {
  return post(null, null, `${baseUrl}/v003/user/users/register/username`, { email, firstName: firstname, lastName: lastname, password, dateOfBirth, gender });
}

export function registerWithFacebook (baseUrl, { email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender }) {
  return post(null, null, `${baseUrl}/v003/user/users/register/facebook`, { email, firstName: firstname, lastName: lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender });
}

export async function resetPassword (baseUrl, { email }) {
  try {
    await post(null, 'en', `${baseUrl}/v003/user/users/register/resetpassword`, { email });
  } catch (error) {
    if (error.name === 'BadRequestError' && error.body) {
      if (error.body.message === 'user already has a reset token') {
        throw 'resetPassword.alreadySendMail';
      }
      throw 'resetPassword.invalidEmail';
    }
    throw error;
  }
}
