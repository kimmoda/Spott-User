import * as request from './_request';

export async function login (baseUrl, { email: emailIn, password }) {
  try {
    const { body } = await request.post(null, `${baseUrl}/v003/security/login`, { userName: emailIn, password });
    const bodyProfile = body.user.profile;
    return {
      authenticationToken: body.authenticationToken,
      user: {
        avatar: bodyProfile.avatar ? { id: bodyProfile.avatar.uuid, url: bodyProfile.avatar.url } : null,
        dateOfBirth: bodyProfile.dateOfBirth,
        email: bodyProfile.email,
        firstname: bodyProfile.firstName,
        followerCount: bodyProfile.followerCount,
        followingCount: bodyProfile.followingCount,
        id: body.user.uuid,
        lastname: bodyProfile.lastName,
        picture: bodyProfile.picture ? { id: bodyProfile.picture.uuid, url: bodyProfile.picture.url } : null,
        tagline: bodyProfile.tagLine,
        username: body.user.userName
      }
    };
  } catch (error) {
    if (error.body.message === 'verkeerde gebruikersnaam/password combinatie') {
      throw 'Email/password combination is incorrect.';
    }
    throw error.body.message;
  }
}

export async function loginFacebook (baseUrl, { facebookAccessToken }) {
  try {
    return await request.post(null, `${baseUrl}/v003/security/login`, { facebookAccessToken });
  } catch (error) {
    if (error.body.message === 'verkeerde gebruikersnaam/password combinatie') {
      throw 'Your Facebook account is not linked to a Spott account. You can create an account on Spott by using your Facebook account.';
    }
    throw error.body.message;
  }
}

export function register (baseUrl, { email, firstname, lastname, password }) {
  return request.post(null, `${baseUrl}/v003/user/users/register/username`, { email, firstName: firstname, lastName: lastname, password });
}
