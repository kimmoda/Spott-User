import { post } from './request';

export function register (baseUrl, data) {
  return post(null, null, `${baseUrl}/v004/user/users/register/username`, data);
}

export function registerWithFacebook (baseUrl, { email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender }) {
  return post(null, null, `${baseUrl}/v004/user/users/register/facebook`, { email, firstName: firstname, lastName: lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender });
}
