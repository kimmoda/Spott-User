import * as request from './_request';

export async function login (baseUrl, { email, password }) {
  try {
    console.log(arguments);
    return await request.post(null, `${baseUrl}/v003/security/login`, { userName: email, password });
  } catch (error) {
    console.info(error);
    if (error.message === 'verkeerde gebruikersnaam/password combinatie') {
      throw 'Email/password combination is incorrect.';
    }
    throw error.message;
  }
}

export async function loginFacebook (baseUrl, { facebookAccessToken }) {
  try {
    return await request.post(null, `${baseUrl}/v003/security/login`, { facebookAccessToken });
  } catch (error) {
    if (error.message === 'verkeerde gebruikersnaam/password combinatie') {
      throw 'Your Facebook account is not linked to a Spott account. You can create an account on Spott by using your Facebook account.';
    }
    throw error.message;
  }
}

export function register (baseUrl, { email, firstname, lastname, password }) {
  return request.post(null, `${baseUrl}/v003/user/users/register/username`, { email, firstName: firstname, lastName: lastname, password });
}
