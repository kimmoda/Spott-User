import { post } from './request';

export function register (baseUrl, data) {
  return post(null, null, `${baseUrl}/v004/user/users/register/username`, data);
}

export function registerWithFacebook (baseUrl, { email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender }) {
  return post(null, null, `${baseUrl}/v004/user/users/register/facebook`, { email, firstName: firstname, lastName: lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender });
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
