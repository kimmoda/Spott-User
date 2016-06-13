import * as request from './_request';

export async function login (baseUrl, { email: emailIn, password }) {
  try {
    const {
      body: {
        authenticationToken,
        user: {
          profile: {
            avatar,
            dateOfBirth,
            email,
            firstName,
            followerCount,
            followingCount,
            lastName,
            picture,
            tagLine
          },
          userName,
          uuid
        }
      }
    } = await request.post(null, `${baseUrl}/v003/security/login`, { userName: emailIn, password });
    return {
      authenticationToken,
      user: {
        id: uuid,
        username: userName
      },
      profile: {
        avatar: avatar ? { id: avatar.uuid, url: avatar.url } : null,
        dateOfBirth,
        email,
        firstname: firstName,
        followerCount,
        followingCount,
        lastname: lastName,
        picture: picture ? { id: picture.uuid, url: picture.url } : null,
        tagline: tagLine
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
